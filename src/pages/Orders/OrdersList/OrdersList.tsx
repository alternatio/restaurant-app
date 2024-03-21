import style from './orderList.module.scss'
import { IOrders } from '@/entities/Order/interfaces.ts'
import OrderCard from '@/entities/Order/OrderCard'
import TipText from '@/shared/ui/TipText'

interface OrdersListProps {
	orders?: IOrders
}

export default function OrdersList({ orders }: OrdersListProps) {
	return (
		<div className={style.wrapper}>
			{orders?.map(order => {
				return <OrderCard key={order.id} order={order} />
			})}
			{orders?.length ? null : <TipText>У вас нет заказов</TipText>}
		</div>
	)
}
