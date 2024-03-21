import { User } from 'firebase/auth'
import { Dispatch, SetStateAction } from 'react'
import Header from '@/widgets/Header'
import { useQuery } from 'react-query'
import { IOrders } from '@/entities/Order/interfaces.ts'
import { getUserOrders } from '@/shared/api/controller.ts'
import Loader from '@/shared/ui/Loader'
import OrdersList from '@/pages/Orders/OrdersList/OrdersList.tsx'

interface OrdersPageProps {
	user: User | undefined
	setUser: Dispatch<SetStateAction<User | undefined>>
}

export default function OrdersPage({ user, setUser }: OrdersPageProps) {
	const { data: orders, isLoading } = useQuery<IOrders | undefined>(
		'menuProducts',
		() => getOrders(),
		{
			enabled: !!user?.uid,
		}
	)

	const getOrders = async () => {
		if (!user?.uid) return
		return await getUserOrders(user.uid)
	}

	return (
		<>
			<Header user={user} setUser={setUser} />
			{isLoading ? <Loader /> : <OrdersList orders={orders} />}
		</>
	)
}
