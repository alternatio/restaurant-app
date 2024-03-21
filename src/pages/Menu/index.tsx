import { User } from 'firebase/auth'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import Header from '@/widgets/Header'
import { IProducts } from '@/entities/Product/interfaces.ts'
import Loader from '@/shared/ui/Loader'
import ProductsList from '@/widgets/ProductsList'
import getMenuProducts from '@/pages/Menu/api/getMenuProducts.ts'
import TipText from '@/shared/ui/TipText'

interface MenuPageProps {
	user: User | undefined
	setUser: Dispatch<SetStateAction<User | undefined>>
}

export default function MenuPage(props: MenuPageProps) {
	const [products, setProducts] = useState<IProducts>([])
	const [loading, setLoading] = useState<boolean>(true)

	const initialResponse = async () => {
		setLoading(true)
		props.user?.uid && await getMenuProducts(setProducts)
		setLoading(false)
	}

	useEffect(() => {
		initialResponse()
	}, [])

	return (
		<>
			<Header {...props} />
			{loading ? <Loader /> : <ProductsList products={products} />}
			{!props.user?.uid ? (
				<TipText>
					Чтобы получить доступ ко всему ассортименту вам придётся
					авторизироваться.
				</TipText>
			) : null}
		</>
	)
}
