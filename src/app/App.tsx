import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from '@/pages/Home'
import ProductPage from '@/pages/Product'
import MenuPage from '@/pages/Menu'

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/menu" element={<MenuPage />} />
				<Route path="/product/:productId" element={<ProductPage />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
