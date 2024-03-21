import style from './content.module.scss'
import { useAppDispatch, useAppSelector } from '@/app/store'
import { useEffect, useState } from 'react'
import {
	clearCart,
	loadCartFromLocalStorage,
} from '@/app/store/reducers/cart.ts'
import TipText from '@/shared/ui/TipText'
import { createOrder } from '@/shared/api/controller.ts'
import { User } from 'firebase/auth'
import AlertPopup from '@/widgets/AlertDialog'
import ProductOrderCard from '@/entities/Product/ProductOrderCard'

interface ContentProps {
	user: User | undefined
}

export default function Content({ user }: ContentProps) {
	const [alertIsVisible, setAlterVisible] = useState(false)
	const dispatch = useAppDispatch()
	const cartItems = useAppSelector(state => state.cart.items)

	useEffect(() => {
		dispatch(loadCartFromLocalStorage())
	}, [dispatch])

	const handleClearCart = () => {
		dispatch(clearCart())
	}

	const handleCreateOrder = () => {
		if (!user) return
		createOrder(user, cartItems)
		setAlterVisible(true)
		handleClearCart()
	}

	return (
		<div className={style.content}>
			{alertIsVisible ? (
				<AlertPopup
					title={'Заказ оформлен'}
					message={
						'Вы можете заказть ещё или просмотреть ваши заказы на соответсвующей странице'
					}
					secondButtonOnClick={() => setAlterVisible(false)}
				/>
			) : null}
			<div className={style.top}>
				<h2 className={style.title}>Ваша корзина</h2>
				<div className={style.buttons}>
					<button onClick={handleCreateOrder}>Оформить заказ</button>
					<button onClick={handleClearCart}>Очистить корзину</button>
				</div>
			</div>
			{cartItems.length === 0 ? (
				<TipText>Ваша корзина пуста.</TipText>
			) : (
				<ul>
					{cartItems.map(product => {
						return <ProductOrderCard key={product.id} product={product} />
					})}
				</ul>
			)}
		</div>
	)
}
