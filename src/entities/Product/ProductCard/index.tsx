import style from './productCard.module.scss'
import { IProduct } from '@/entities/Product/interfaces.ts'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import getImagePath from '@/shared/api/downloadImage.ts'

interface ProductCardProps {
	product: IProduct
}

export default function ProductCard({ product }: ProductCardProps) {
	const [image, setImage] = useState('')
	const [isImageLoaded, setIsImageLoaded] = useState(false)

	const initialResponse = async () => {
		if (!product?.image) return
		setImage(await getImagePath(product.image))
		setIsImageLoaded(true)
	}

	useEffect(() => {
		initialResponse()
	}, [])

	return (
		<Link className={style.card} to={`/product/${product.id}`}>
			{isImageLoaded ? <img
				className={style.image}
				src={image}
				alt={`productImage — ${product.name}`}
				loading={'eager'}
			/> : <div className={style.image}>image is loading</div>}

			<span className={style.title}>{product.name}</span>
			<span className={style.cost}>-{product.cost} €</span>
			{/*<p className={style.description}>*/}
			{/*	{product.description}*/}
			{/*</p>*/}
		</Link>
	)
}
