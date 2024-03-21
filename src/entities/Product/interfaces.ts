export interface IProduct {
	id: string
	name: string
	image: string
	cost: number
	description: string
}

export type IProductWithoutID = Omit<IProduct, 'id'>
export type IProductsWithoutID = IProductWithoutID[]

export type IProductWIthCount = IProduct & { count: number }
export type IProductsWIthCount = IProductWIthCount[]

export type IProducts = IProduct[]
