import { IProductsWIthCount } from '@/entities/Product/interfaces.ts'

export default function calculateFullCost(products: IProductsWIthCount) {
	let fullCost = 0

	products?.forEach(product => {
		fullCost += product.cost * product.count
	})

	return fullCost
}
