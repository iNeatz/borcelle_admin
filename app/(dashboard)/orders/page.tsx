import { DataTable } from '@/components/custom ui/DataTable'
import { columns } from '@/components/orders/OrderColumns'
import { Separator } from '@/components/ui/separator'

const Orders = async () => {
	const res = await fetch('https://borcelle-admin.vercel.app/api/orders', {
		cache: 'no-store',
	})

	const orders = await res.json()

	return (
		<div className='px-10 py-5'>
			<p className='text-heading2-bold'>Orders</p>
			<Separator className='bg-grey-1 my-5' />
			<DataTable columns={columns} searchKey='_id' data={orders} />
		</div>
	)
}

export default Orders
