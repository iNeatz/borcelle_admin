'use client'

import { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'

import Delete from '../custom ui/Delete'

export const columns: ColumnDef<ProductType>[] = [
	{
		accessorKey: 'title',
		header: 'Product Name',
		cell: ({ row }) => (
			<Link
				href={`/products/${row.original._id}`}
				className='hover:text-red-1 hover:underline'
			>
				{row.original.title}
			</Link>
		),
	},
	{
		accessorKey: 'category',
		header: 'Category',
		cell: ({ row }) => <p>{row.original.category}</p>,
	},
	{
		accessorKey: 'collections',
		header: 'Collections',
		cell: ({ row }) => (
			<p>
				{row.original.collections
					.map((collection) => collection.title)
					.join(', ')}
			</p>
		),
	},
	{
		accessorKey: 'price',
		header: 'Price ($)',
		cell: ({ row }) => <p>{row.original.price.toFixed(2)}</p>,
	},
	{
		accessorKey: 'expense',
		header: 'Cost ($)',
		cell: ({ row }) => <p>{row.original.expense.toFixed(2)}</p>,
	},
	{
		id: 'actions',
		cell: ({ row }) => <Delete item="product" id={row.original._id} />,
	},
]
