import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IProductWIthCount } from '@/entities/Product/interfaces.ts'

interface CartState {
	items: IProductWIthCount[]
}

const initialState: CartState = {
	items: [],
}

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItemToCart(state, action: PayloadAction<IProductWIthCount>) {
			const newItem = action.payload
			const existingItemIndex = state.items.findIndex(
				item => item.id === newItem.id
			)

			if (existingItemIndex !== -1) {
				state.items[existingItemIndex].count += newItem.count
			} else {
				state.items.push(newItem)
			}

			// Save to localStorage
			localStorage.setItem('cartItems', JSON.stringify(state.items))
		},
		removeItemFromCart(state, action: PayloadAction<string>) {
			const itemIdToRemove = action.payload
			state.items = state.items.filter(item => item.id !== itemIdToRemove)

			// Save to localStorage
			localStorage.setItem('cartItems', JSON.stringify(state.items))
		},
		clearCart(state) {
			state.items = []

			// Save to localStorage
			localStorage.setItem('cartItems', JSON.stringify(state.items))
		},
		updateCartItemQuantity(
			state,
			action: PayloadAction<{ id: string; newQuantity: number }>
		) {
			const { id, newQuantity } = action.payload
			const itemToUpdate = state.items.find(item => item.id === id)

			if (itemToUpdate) {
				itemToUpdate.count = newQuantity
			}

			// Save to localStorage
			localStorage.setItem('cartItems', JSON.stringify(state.items))
		},
		loadCartFromLocalStorage(state) {
			const savedCartItems = localStorage.getItem('cartItems')
			if (savedCartItems) {
				state.items = JSON.parse(savedCartItems)
			}
		},
	},
})

export const {
	addItemToCart,
	removeItemFromCart,
	clearCart,
	updateCartItemQuantity,
	loadCartFromLocalStorage,
} = cartSlice.actions

export default cartSlice.reducer
