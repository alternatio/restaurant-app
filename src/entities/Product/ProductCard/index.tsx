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

	const initialResponse = async () => {
		if (!product?.image) return
		setImage(await getImagePath(product.image))
	}

	useEffect(() => {
		initialResponse()
	}, [])

	return (
		<Link className={style.card} to={`/product/${product.id}`}>
			<img
				className={style.image}
				src={image}
				alt={`productImage — ${product.name}`}
			/>
			<span className={style.title}>{product.name}</span>
			<span className={style.cost}>-{product.cost} €</span>
			{/*<p className={style.description}>*/}
			{/*	{product.description}*/}
			{/*</p>*/}
		</Link>
	)
}
