import style from './content.module.scss'
import { IProduct, IProductWIthCount } from '@/entities/Product/interfaces.ts'
import Button from '@/shared/ui/Button'
import { User } from 'firebase/auth'
import { useAppDispatch } from '@/app/store'
import { addItemToCart } from '@/app/store/reducers/cart.ts'
import { useState } from 'react'
import TipText from '@/shared/ui/TipText'
import AlertPopup from '@/widgets/AlertDialog'

interface ContentProps {
	user?: User
	product?: IProduct
	image?: string
}

export default function Content({ user, product, image }: ContentProps) {
	const [alertIsVisible, setAlertIsVisible] = useState(false)
	const [count, setCount] = useState(1)

	const dispatch = useAppDispatch()

	const handleAddToCart = () => {
		if (!product) return
		const item: IProductWIthCount = {
			...product,
			count,
		}
		dispatch(addItemToCart(item))
		setAlertIsVisible(true)
	}

	const decrementCount = () => {
		if (count > 1) {
			setCount(count - 1)
		}
	}

	const incrementCount = () => {
		setCount(count + 1)
	}

	return (
		<div className={style.content}>
			<AlertPopup
				isVisible={alertIsVisible}
				title={'Товар добавлен в корзину'}
				message={'Теперь вы можете перейти в корзину для оформления заказа'}
				secondButtonOnClick={() => setAlertIsVisible(false)}
			/>
			<img
				className={style.image}
				src={image}
				alt={`productImage — ${product?.name}`}
				loading={'eager'}
			/>
			<div className={style.contentPart}>
				<span className={style.name}>{product?.name}</span>
				<span className={style.cost}>-{product?.cost} €</span>
				{user?.uid ? (
					<>
						<div className={style.counter}>
							<button onClick={decrementCount}>-</button>
							<span>{count}</span>
							<button onClick={incrementCount}>+</button>
						</div>
						<Button onClick={handleAddToCart}>Заказать</Button>
					</>
				) : (
					<TipText>Чтобы заказать, нужно авторизироваться </TipText>
				)}
				<p className={style.description}>{product?.description}</p>
			</div>
		</div>
	)
}
