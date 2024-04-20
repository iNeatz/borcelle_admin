'use client'

import { useEffect, useState } from 'react'

import { columns } from '@/components/collections/CollectionColumns'
import { DataTable } from '@/components/custom ui/DataTable'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import Loader from '@/components/custom ui/Loader'

const Collections = () => {
	const [loading, setLoading] = useState(true)
	const [collections, setCollections] = useState([])

	const getCollections = async () => {
		try {
			const res = await fetch('/api/collections', {
				method: 'GET',
			})
			const data = await res.json()
			setCollections(data)
			setLoading(false)
		} catch (error) {
			console.log('[collections_GET]', error)
		}
	}

	useEffect(() => {
		getCollections()
	}, [])

	return (
		<div className='px-10 py-5'>
			{loading ? (
				<Loader />
			) : (
				<div>
					<div className='flex items-center justify-between'>
						<p className='text-heading2-bold'>Collections</p>
						<Link href='/collections/new'>
							<Button className='bg-blue-1 text-white'>
								<Plus className='w-4 h-4' />
								Create Collection
							</Button>
						</Link>
					</div>
					<Separator className='my-4 bg-grey-1' />
					<DataTable columns={columns} data={collections} searchKey='title' />
				</div>
			)}
		</div>
	)
}

export default Collections
