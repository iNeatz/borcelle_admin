'use client'

import { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'

export const columns: ColumnDef<OrderColumnType>[] = [
	{
		accessorKey: '_id',
		header: 'Order ID',
		cell: ({ row }) => (
			<Link
				href={`/orders/${row.original._id}`}
				className='hover:text-red-1 hover:underline'
			>
				{row.original._id}
			</Link>
		),
	},
	{
		accessorKey: 'customer',
		header: 'Customer',
		cell: ({ row }) => <p>{row.original.customer}</p>,
	},
	{
		accessorKey: 'products',
		header: 'Products',
		cell: ({ row }) => <p>{row.original.products}</p>,
	},
	{
		accessorKey: 'totalAmount',
		header: 'Total Amount',
		cell: ({ row }) => <p>{row.original.totalAmount}</p>,
	},
	{
		accessorKey: 'createdAt',
		header: 'Date',
		cell: ({ row }) => <p>{row.original.createdAt}</p>,
	},
]
