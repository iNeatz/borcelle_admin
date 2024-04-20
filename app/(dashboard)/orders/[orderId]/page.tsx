import { DataTable } from '@/components/custom ui/DataTable'
import { columns } from '@/components/orderItems/OrderItemsColumns'

const OrderDetails = async ({ params }: { params: { orderId: string } }) => {
	const res = await fetch(
		`https://borcelle-admin.vercel.app/api/orders/${params.orderId}`
	)

	const { orderDetails, customer } = await res.json()

	const { street, city, state, postalCode, country } =
		orderDetails.shippingAddress

	return (
		<div className='flex flex-col p-10 gap-5'>
			<p className='text-body-bold'>
				Order ID: <span className='text-base-medium'>{orderDetails._id}</span>
			</p>
			<p className='text-body-bold'>
				Customer Name: <span className='text-base-medium'>{customer.name}</span>
			</p>
			<p className='text-body-bold'>
				Shipping Address:{' '}
				<span className='text-base-medium'>
					{street}, {city}, {state}, {postalCode}, {country}
				</span>
			</p>
			<p className='text-body-bold'>
				Total Paid:{' '}
				<span className='text-base-medium'>${orderDetails.totalAmount}</span>
			</p>
			<p className='text-body-bold'>
				Shipping Rate ID:{' '}
				<span className='text-base-medium'>{orderDetails.shippingRate}</span>
			</p>
			<DataTable
				columns={columns}
				data={orderDetails.products}
				searchKey='product'
			/>
		</div>
	)
}

export default OrderDetails
