import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from '@/pages/Home'
import ProductPage from '@/pages/Product'
import MenuPage from '@/pages/Menu'
import { useState } from 'react'
import { User } from 'firebase/auth'
import CartPage from '@/pages/Cart'
import OrdersPage from '@/pages/Orders'

function App() {
	const [user, setUser] = useState<User | undefined>(
		JSON.parse(`${localStorage.getItem('user')}`)
	)

	return (
		<BrowserRouter>
			<Routes>
				{/* home page */}
				<Route path='/' element={<HomePage user={user} setUser={setUser} />} />

				{/* menu page */}
				<Route
					path='/menu'
					element={<MenuPage user={user} setUser={setUser} />}
				/>

				{/* product page */}
				<Route
					path='/product/:productId'
					element={<ProductPage user={user} setUser={setUser} />}
				/>

				{/* cart page */}
				<Route
					path='/cart'
					element={<CartPage user={user} setUser={setUser} />}
				/>

				{/* cart page */}
				<Route
					path='/orders'
					element={<OrdersPage user={user} setUser={setUser} />}
				/>
			</Routes>
		</BrowserRouter>
	)
}

export default App
