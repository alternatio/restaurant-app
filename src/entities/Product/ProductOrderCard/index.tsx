import style from './productOrderCard.module.scss'
import { IProductWIthCount } from '@/entities/Product/interfaces.ts'
import { useEffect, useState } from 'react'
import getImagePath from '@/shared/api/downloadImage.ts'
import {
	removeItemFromCart,
	updateCartItemQuantity,
} from '@/app/store/reducers/cart.ts'
import { useAppDispatch } from '@/app/store'

interface ProductOrderCardProps {
	product: IProductWIthCount
}

export default function ProductOrderCard({ product }: ProductOrderCardProps) {
	const dispatch = useAppDispatch()
	const [image, setImage] = useState('')

	const initialResponse = async () => {
		if (!product?.image) return
		setImage(await getImagePath(product.image))
	}

	useEffect(() => {
		initialResponse()
	}, [])

	const handleRemoveFromCart = (itemId: string) => {
		dispatch(removeItemFromCart(itemId))
	}

	const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
		dispatch(updateCartItemQuantity({ id: itemId, newQuantity }))
	}

	return (
		<div className={style.card}>
			<img className={style.image} src={image} alt={product.name} />
			<div className={style.content}>
				<h3 className={style.name}>{product.name}</h3>
				<div className={style.costs}>
					<span className={style.cost}>Цена: {product.cost} €</span>
					<span className={style.cost}>
						Общая стоимость: {product.cost * product.count} €
					</span>
				</div>
				<p className={style.description}>{product.description}</p>
				<div className={style.buttons}>
					<button
						onClick={() => {
							if (product.count <= 1) return
							handleUpdateQuantity(product.id, product.count - 1)
						}}>
						-
					</button>
					<span className={style.count}>{product.count}</span>
					<button
						onClick={() => handleUpdateQuantity(product.id, product.count + 1)}>
						+
					</button>
				</div>

				<button onClick={() => handleRemoveFromCart(product.id)}>
					Удалить
				</button>
			</div>
		</div>
	)
}
