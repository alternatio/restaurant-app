export interface IProduct {
	id: string
	name: string
	image: string
	cost: number
	description: string
}

export type IProductWithoutID = Omit<IProduct, 'id'>

export type IProducts = IProduct[]
