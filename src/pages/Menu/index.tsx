import { useQuery } from 'react-query'
import Header from '@/widgets/Header'
import { IProducts } from '@/entities/Product/interfaces.ts'
import Loader from '@/shared/ui/Loader'
import ProductsList from '@/widgets/ProductsList'
import getMenuProducts from '@/pages/Menu/api/getMenuProducts.ts'
import TipText from '@/shared/ui/TipText'
import { Dispatch, SetStateAction } from 'react'
import { User } from 'firebase/auth'

interface MenuPageProps {
	user: User | undefined
	setUser: Dispatch<SetStateAction<User | undefined>>
}

export default function MenuPage(props: MenuPageProps) {
	const { data: products, isLoading } = useQuery<IProducts>(
		'menuProducts',
		() => getMenuProducts(),
		{
			enabled: !!props.user?.uid,
		}
	)

	return (
		<>
			<Header {...props} />
			{isLoading ? <Loader /> : <ProductsList products={products} />}
			{!props.user?.uid && (
				<TipText>
					Чтобы получить доступ ко всему ассортименту вам придётся
					авторизироваться.
				</TipText>
			)}
		</>
	)
}
