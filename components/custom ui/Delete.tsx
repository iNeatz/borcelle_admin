'use client'

import { Trash } from 'lucide-react'
import React, { useState } from 'react'

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '../ui/button'
import { toast } from '../ui/use-toast'

interface DeleteProps {
	id: string
	item: string
}

const Delete: React.FC<DeleteProps> = ({ id, item }) => {
	const [loading, setLoading] = useState(false)

	const onDelete = async () => {
		try {
			setLoading(true)
			const itemType = item === 'product' ? 'products' : 'collections'
			const res = await fetch(`/api/${itemType}/${id}`, {
				method: 'DELETE',
			})

			if (res.ok) {
				window.location.href = `/${itemType}`
				toast({
					description: `${item} deleted successfully.`,
				})
				setLoading(false)
			}
		} catch (error) {
			console.log(error)
			toast({
				variant: 'destructive',
				description: 'Something went wrong. Please Try Again!',
			})
		}
	}

	return (
		<AlertDialog>
			<AlertDialogTrigger>
				<Button className='bg-red-1 text-white'>
					<Trash className='h-4 w-4' />
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent className='bg-white text-grey-1'>
				<AlertDialogHeader>
					<AlertDialogTitle className='text-red-1'>
						Are you absolutely sure?
					</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently delete your{' '}
						{item}.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction className='bg-red-1 text-white' onClick={onDelete}>
						Delete
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}

export default Delete
