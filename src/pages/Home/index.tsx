import Header from '@/widgets/Header'
import Hero from '@/widgets/Hero'
import { User } from 'firebase/auth'
import { Dispatch, SetStateAction } from 'react'
import ProductsList from '@/widgets/ProductsList'
import TipText from '@/shared/ui/TipText'
import { IProducts } from '@/entities/Product/interfaces.ts'
import getHomeProducts from '@/pages/Home/api/getHomeProducts.ts'
import Loader from '@/shared/ui/Loader'
import { useQuery } from 'react-query'

interface HomePageProps {
	user: User | undefined
	setUser: Dispatch<SetStateAction<User | undefined>>
}

export default function HomePage(props: HomePageProps) {
	const { data: products, isLoading } = useQuery<IProducts>(
		'homeProducts',
		getHomeProducts
	)

	return (
		<>
			<Header {...props} />
			<Hero />
			{isLoading ? <Loader /> : <ProductsList products={products || []} />}
			<TipText>
				{props.user?.uid
					? 'Полный список продукции в меню'
					: 'Чтобы получить доступ ко всему ассортименту вам придётся авторизироваться.'}
			</TipText>
		</>
	)
}
