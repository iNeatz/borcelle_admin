'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Plus } from 'lucide-react'

import Loader from '@/components/custom ui/Loader'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { DataTable } from '@/components/custom ui/DataTable'
import { toast } from '@/components/ui/use-toast'
import { columns } from '@/components/products/ProductColumns'

const Products = () => {
	const [loading, setLoading] = useState(true)
	const [products, setProducts] = useState<ProductType[]>([])

	const getProducts = async () => {
		try {
			const res = await fetch('/api/products', {
				method: 'GET',
			})

			const data = await res.json()
			setProducts(data)

			setLoading(false)
		} catch (error) {
			console.log('[products_GET]', error)
		}
	}

  useEffect(() => {
    getProducts()
  }, [])

	return loading ? (
		<Loader />
	) : (
		<div className='px-10 py-5'>
			<div className='flex items-center justify-between'>
				<p className='text-heading2-bold'>Products</p>
				<Link href='/products/new'>
					<Button className='bg-blue-1 text-white'>
						<Plus className='w-4 h-4' />
						Create Product
					</Button>
				</Link>
			</div>
			<Separator className='my-4 bg-grey-1' />
			<DataTable columns={columns} data={products} searchKey='title' />
		</div>
	)
}

export default Products
