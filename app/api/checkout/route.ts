import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

const corsHeader = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
	'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export async function OPTIONS() {
	return NextResponse.json({}, { headers: corsHeader })
}

export async function POST(req: NextRequest) {
	try {
		const { cartItems, customer } = await req.json()

		if (!cartItems || !customer) {
			return new NextResponse('Not enough data to checkout', { status: 400 })
		}

		const session = await stripe.checkout.sessions.create({
			payment_method_types: ['card'],
			mode: 'payment',
			shipping_address_collection: {
				allowed_countries: ['US', 'CA'],
			},
			shipping_options: [
				{
					shipping_rate: 'shr_1P6yrJ03Q9BxmMnKNWPdKDlD',
				},
				{
					shipping_rate: 'shr_1P6yrh03Q9BxmMnKINfsXyMz',
				},
				{
					shipping_rate: 'shr_1P6ys303Q9BxmMnKcg6m43V7',
				},
			],
			line_items: cartItems.map((cartItem: any) => ({
				price_data: {
					currency: 'usd',
					product_data: {
						name: cartItem.item.title,
						metadata: {
							productId: cartItem.item._id,
							...(cartItem.size && { size: cartItem.size }),
							...(cartItem.color && { color: cartItem.color }),
						},
					},
					unit_amount: cartItem.item.price * 100, //*100 if error
				},
				quantity: cartItem.quantity,
			})),
			client_reference_id: customer.clerkId,
			success_url: `${process.env.ECOMMERCE_STORE_URL}/payment_success`,
			cancel_url: `${process.env.ECOMMERCE_STORE_URL}/cart`,
		})

		return NextResponse.json(session, { headers: corsHeader })
	} catch (error) {
		console.log('checkout_POST', error)
		return new NextResponse('Internal Server Error', { status: 500 })
	}
}
