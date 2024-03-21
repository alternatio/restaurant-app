import { Dispatch, SetStateAction, useEffect } from 'react'
import { User } from 'firebase/auth'
import Header from '@/widgets/Header'
import { useAppDispatch, useAppSelector } from '@/app/store'
import {
	clearCart,
	loadCartFromLocalStorage,
	removeItemFromCart,
	updateCartItemQuantity,
} from '@/app/store/reducers/cart.ts'

interface CartPageProps {
	user: User | undefined
	setUser: Dispatch<SetStateAction<User | undefined>>
}

export default function CartPage({ user, setUser }: CartPageProps) {
	const dispatch = useAppDispatch()
	const cartItems = useAppSelector(state => state.cart.items)

	useEffect(() => {
		// Загружаем корзину из localStorage при монтировании компонента
		dispatch(loadCartFromLocalStorage())
	}, [dispatch])

	// const handleAddToCart = (item: CartItem) => {
	// 	dispatch(addItemToCart(item));
	// };

	const handleRemoveFromCart = (itemId: string) => {
		dispatch(removeItemFromCart(itemId))
	}

	const handleClearCart = () => {
		dispatch(clearCart())
	}

	const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
		dispatch(updateCartItemQuantity({ id: itemId, newQuantity }))
	}

	return (
		<>
			<Header user={user} setUser={setUser} />
			<h2>Cart</h2>
			{cartItems.length === 0 ? (
				<p>Your cart is empty.</p>
			) : (
				<ul>
					{cartItems.map(item => (
						<li key={item.id}>
							<img src={item.image} alt={item.name} />
							<div>
								<h3>{item.name}</h3>
								<p>{item.description}</p>
								<p>Price: ${item.cost}</p>
								<p>Quantity: {item.count}</p>
								<button onClick={() => handleRemoveFromCart(item.id)}>
									Remove
								</button>
								<button
									onClick={() => handleUpdateQuantity(item.id, item.count + 1)}>
									+
								</button>
								<button
									onClick={() => handleUpdateQuantity(item.id, item.count - 1)}>
									-
								</button>
							</div>
						</li>
					))}
				</ul>
			)}
			<button onClick={handleClearCart}>Clear Cart</button>
		</>
	)
}
