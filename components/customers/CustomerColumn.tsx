'use client'

import { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'

export const columns: ColumnDef<CustomerType>[] = [
	{
		accessorKey: 'clerkId',
		header: 'Clerk ID',
		cell: ({ row }) => <p>{row.original.clerkId}</p>,
	},
	{
		accessorKey: 'name',
		header: 'Customer Name',
		cell: ({ row }) => <p>{row.original.name}</p>,
	},
	{
		accessorKey: 'email',
		header: 'Email Address',
		cell: ({ row }) => <p>{row.original.email}</p>,
	},
]
