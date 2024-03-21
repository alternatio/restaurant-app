import { IProducts } from '@/entities/Product/interfaces.ts'
import { getProducts } from '@/shared/api/controller.ts'

export default async function getMenuProducts(setter: (products: IProducts) => void) {
	const products = await getProducts(1000)
	setter(products)
}