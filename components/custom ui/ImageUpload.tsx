import { CldUploadWidget } from 'next-cloudinary'
import { Plus, Trash } from 'lucide-react'

import { Button } from '../ui/button'
import Image from 'next/image'

interface ImageUploadProps {
	value: string[]
	onChange: (value: string) => void
	onRemove: (value: string) => void
}

const ImageUpload: React.FC<ImageUploadProps> = ({
	value,
	onChange,
	onRemove,
}) => {
	const onUpload = (result: any) => {
		onChange(result.info.secure_url)
	}

	return (
		<div>
			<div className='mb-4 flex flex-wrap items-center gap-4'>
				{value.map((url) => (
					<div className='relative w-[200px] h-[200px]' key={url}>
						<div className='absolute top-0 right-0 z-10'>
							<Button
								onClick={() => onRemove(url)}
								size='sm'
								className='bg-red-1 text-white'
								type="button"
							>
								<Trash />
							</Button>
						</div>
						<Image
							src={url}
							fill
							alt='collection'
							className='object-cover rounded-lg'
						/>
					</div>
				))}
			</div>
			<CldUploadWidget uploadPreset='thd1ugsv' onUpload={onUpload}>
				{({ open }) => {
					return (
						<Button
							type='button'
							onClick={() => open()}
							className='bg-grey-1 text-white'
						>
							<Plus className='h-4 w-4 mr-2' />
							Upload Image
						</Button>
					)
				}}
			</CldUploadWidget>
		</div>
	)
}

export default ImageUpload
