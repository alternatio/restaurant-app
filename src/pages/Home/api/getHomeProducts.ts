import { getProducts } from '@/shared/api/controller.ts'
import { IProducts } from '@/entities/Product/interfaces.ts'

export default async function getHomeProducts(setter: (products: IProducts) => void) {
	const products = await getProducts(3)
	setter(products)
}
