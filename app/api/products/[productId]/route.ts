import { auth } from '@clerk/nextjs'
import { NextRequest, NextResponse } from 'next/server'

import { connectToDB } from '@/lib/mongoDB'
import Product from '@/lib/models/Product'
import Collection from '@/lib/models/Collection'

export const DELETE = async (
	req: NextRequest,
	{ params }: { params: { productId: string } }
) => {
	try {
		const { userId } = auth()

		if (!userId) {
			return new NextResponse('Unauthorized', { status: 403 })
		}

		await connectToDB()

		const product = await Product.findById(params.productId)

		if (!product) {
			return new NextResponse(
				JSON.stringify({ message: 'Product Not Found' }),
				{ status: 404 }
			)
		}

		await Promise.all(
			product.collections.map((collectionId: string) =>
				Collection.findByIdAndUpdate(collectionId, {
					$pull: { products: product._id },
				})
			)
		)

		await Product.findByIdAndDelete(params.productId)

		return new NextResponse('Product Deleted Successfully', { status: 200 })
	} catch (error) {
		console.log('[products_DELETE]', error)
		return new NextResponse('Internal Server Error', { status: 500 })
	}
}

export const GET = async (
	req: NextRequest,
	{ params }: { params: { productId: string } }
) => {
	try {
		await connectToDB()

		const product = await Product.findById(params.productId).populate({
			path: 'collections',
			model: Collection,
		})

		if (!product) {
			return new NextResponse(
				JSON.stringify({ message: 'Product Not Found' }),
				{ status: 404 }
			)
		}

		return NextResponse.json(product, {
			status: 200,
			headers: {
				'Access-Control-Allow-Origin': `${process.env.ECOMMERCE_STORE_URL}`,
				'Access-Control-Allow-Methods': 'GET',
				'Access-Control-Allow-Headers': 'Content-Type',
			},
		})
	} catch (error) {
		console.log('[productDetails_GET]', error)
		return new NextResponse('Internal Server Error', { status: 500 })
	}
}

export const POST = async (
	req: NextRequest,
	{ params }: { params: { productId: string } }
) => {
	try {
		const { userId } = auth()

		if (!userId) {
			return new NextResponse('Unauthorized', { status: 403 })
		}

		await connectToDB()

		let product = await Product.findById(params.productId)

		if (!product) {
			return new NextResponse(
				JSON.stringify({ message: 'Product Not Found' }),
				{ status: 404 }
			)
		}

		const {
			title,
			description,
			media,
			category,
			collections,
			tags,
			sizes,
			colors,
			price,
			expense,
		} = await req.json()

		if (!title || !description || !media || !category || !price || !expense) {
			return new NextResponse('Not enough data to create a product', {
				status: 400,
			})
		}

		const addedCollections = collections.filter(
			(collectionId: string) => !product.collections.includes(collectionId)
		)

		const productCollections = product.collections.map((collectionId: any) => {
			return collectionId.toString()
		})

		const removedCollections = productCollections.filter(
			(collectionId: string) => !collections.includes(collectionId)
		)

		// Update collections
		await Promise.all([
			// Update added collections with this product
			...addedCollections.map((collectionId: string) =>
				Collection.findByIdAndUpdate(collectionId, {
					$push: { products: product._id },
				})
			),

			// Update removed collections without this product
			...removedCollections.map((collectionId: string) =>
				Collection.findByIdAndUpdate(collectionId, {
					$pull: { products: product._id },
				})
			),
		])

		const updatedProduct = await Product.findByIdAndUpdate(
			params.productId,
			{
				title,
				description,
				media,
				category,
				collections,
				tags,
				sizes,
				colors,
				price,
				expense,
			},
			{ new: true }
		).populate({ path: 'collections', model: Collection })

		return NextResponse.json(updatedProduct, { status: 200 })
	} catch (error) {
		console.log('[productDetails_POST]', error)
		return new NextResponse('Internal Server Error', { status: 500 })
	}
}
