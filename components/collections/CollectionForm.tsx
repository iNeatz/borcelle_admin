'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Separator } from '../ui/separator'
import { Input } from '@/components/ui/input'
import { Textarea } from '../ui/textarea'
import ImageUpload from '../custom ui/ImageUpload'
import { useToast } from '../ui/use-toast'
import Delete from '../custom ui/Delete'

const formSchema = z.object({
	title: z.string().min(2).max(20),
	description: z.string().min(2).max(500).trim(),
	image: z.string(),
})

interface CollectionFormProps {
	initialData?: CollectionType | null
}

const CollectionForm: React.FC<CollectionFormProps> = ({ initialData }) => {
	const router = useRouter()
	const { toast } = useToast()

	const [loading, setLoading] = useState(false)

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: initialData
			? initialData
			: {
					title: '',
					description: '',
					image: '',
			  },
	})

	const handleKeyPress = (
		e:
			| React.KeyboardEvent<HTMLInputElement>
			| React.KeyboardEvent<HTMLTextAreaElement>
	) => {
		if (e.key === 'Enter') {
			e.preventDefault()
		}
	}

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			setLoading(true)
			const url = initialData
				? `/api/collections/${initialData._id}`
				: '/api/collections'
			const res = await fetch(url, {
				method: 'POST',
				body: JSON.stringify(values),
				headers: {
					'Content-Type': 'application/json',
				},
			})

			if (res.ok) {
				setLoading(false)
				toast({
					description: initialData
						? 'Collection updated successfully.'
						: 'Collection created successfully.',
				})
				window.location.href = '/collections'
				router.push('/collections')
			}
		} catch (error) {
			console.log('[Collections_POST]', error)
			toast({
				variant: 'destructive',
				description: 'Something went wrong. Please Try Again!',
			})
		}
	}

	return (
		<div className='p-10'>
			{initialData ? (
				<div className='flex items-center justify-between'>
					<p className='text-heading2-bold'>Update Collection</p>
					<Delete item='collection' id={initialData._id} />
				</div>
			) : (
				<p className='text-heading2-bold'>Create Collection</p>
			)}

			<Separator className='bg-grey-1 my-4' />

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
					<FormField
						control={form.control}
						name='title'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Title</FormLabel>
								<FormControl>
									<Input
										placeholder='Title'
										{...field}
										onKeyDown={handleKeyPress}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='description'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Description</FormLabel>
								<FormControl>
									<Textarea
										placeholder='Description'
										{...field}
										rows={5}
										onKeyDown={handleKeyPress}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='image'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Image</FormLabel>
								<br />
								<FormControl>
									<ImageUpload
										value={field.value ? [field.value] : []}
										onChange={(url) => field.onChange(url)}
										onRemove={() => field.onChange('')}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className='flex gap-4'>
						<Button type='submit' className='bg-blue-1 text-white'>
							{loading ? 'Submitting...' : 'Submit'}
						</Button>
						<Button
							type='button'
							className='bg-red-1 text-white'
							onClick={() => router.push('/collections')}
						>
							Discard
						</Button>
					</div>
				</form>
			</Form>
		</div>
	)
}

export default CollectionForm
