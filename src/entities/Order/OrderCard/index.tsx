import style from './orderCard.module.scss'
import { IOrder } from '@/entities/Order/interfaces.ts'
import calculateFullCost from '@/features/calculateFullCost.ts'
import CustomLink from '@/shared/ui/Link'

interface OrderCardProps {
	order: IOrder
}

export default function OrderCard({ order }: OrderCardProps) {
	return (
		<div className={style.card}>
			<span className={style.id}>ID заказа: {order.id}</span>
			<div className={style.products}>
				{order?.products?.map(product => {
					return (
						<CustomLink
							key={product.id}
							to={`/product/${product.id}`}
							className={style.product}>
							<span className={style.productName}>{product.count} * </span>
							<span className={style.productName}>{product.name} </span>
							<span className={style.productCost}>{product.cost} €</span>
						</CustomLink>
					)
				})}
			</div>
			<span className={style.fullCost}>
				Полная стоимость заказа: {calculateFullCost(order.products)} €
			</span>
		</div>
	)
}
