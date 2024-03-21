import { IProductsWIthCount } from '@/entities/Product/interfaces.ts'

export interface IOrder {
	id: string
	userUID: string
	products: IProductsWIthCount
}

export type IOrderWithoutID = Omit<IOrder, 'id'>

export type IOrders = IOrder[]