import { IProductsWIthCount } from '@/entities/Product/interfaces.ts'

export interface IOrder {
	id: string
	userUID: string
	address?: string
	payMethod?: IPayMethods
	products: IProductsWIthCount
}

export type IPayMethods = 'Наличными' | 'Картой'

export type IOrderWithoutID = Omit<IOrder, 'id'>

export type IOrders = IOrder[]
