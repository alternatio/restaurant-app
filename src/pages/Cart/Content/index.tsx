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
import calculateFullCost from '@/features/calculateFullCost.ts'
import { IOrderWithoutID, IPayMethods } from '@/entities/Order/interfaces.ts'

interface ContentProps {
	user: User | undefined
}

export default function Content({ user }: ContentProps) {
	const [alertIsVisible, setAlterVisible] = useState(false)
	const dispatch = useAppDispatch()
	const cartItems = useAppSelector(state => state.cart.items)
	const [address, setAddress] = useState('')
	const [payMethod, setPayMethod] = useState<IPayMethods>('Наличными')

	useEffect(() => {
		dispatch(loadCartFromLocalStorage())
	}, [dispatch])

	const handleClearCart = () => {
		dispatch(clearCart())
	}

	const handleCreateOrder = () => {
		if (!user) return
		const order: IOrderWithoutID = {
			userUID: user.uid,
			products: cartItems,
			address: address,
			payMethod: payMethod,
		}
		createOrder(order)
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
				<div className={style.orderDetails}>
					<label className={style.label}>
						<span>Адрес доставки:</span>
						<input
							type='text'
							value={address}
							onChange={e => setAddress(e.target.value)}
						/>
					</label>

					<label className={style.label}>
						<span>Метод оплаты:</span>
						<select
							value={payMethod}
							onChange={e => setPayMethod(e.target.value as IPayMethods)}>
							<option value='Наличными'>Наличными</option>
							<option value='Картой'>Картой</option>
						</select>
					</label>
				</div>
			</div>
			{cartItems.length === 0 ? (
				<TipText>Ваша корзина пуста.</TipText>
			) : (
				<>
					<ul>
						{cartItems.map(product => {
							return <ProductOrderCard key={product.id} product={product} />
						})}
					</ul>
					<div className={style.buttons}>
						<span className={style.fullCost}>
							Общая стоимость: {calculateFullCost(cartItems)}€
						</span>
						<button className={style.button} onClick={handleCreateOrder}>Оформить заказ</button>
						<button className={style.button} onClick={handleClearCart}>Очистить корзину</button>
					</div>
				</>
			)}
		</div>
	)
}
