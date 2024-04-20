'use client'

import { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'

export const columns: ColumnDef<OrderItemType>[] = [
	{
		accessorKey: 'product',
		header: 'Product',
		cell: ({ row }) => (
			<Link
				href={`/products/${row.original.product._id}`}
				className='hover:text-red-1 hover:underline'
			>
				{row.original.product.title}
			</Link>
		),
	},
	{
		accessorKey: 'color',
		header: 'Color',
		cell: ({ row }) => <p>{row.original.color}</p>,
	},
	{
		accessorKey: 'size',
		header: 'Size',
		cell: ({ row }) => <p>{row.original.size}</p>,
	},
	{
		accessorKey: 'quantity',
		header: 'Quantity',
		cell: ({ row }) => <p>{row.original.quantity}</p>,
	},
]
