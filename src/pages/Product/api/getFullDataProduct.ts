import { getProduct } from "@/shared/api/controller";
import { IProduct, IProductWithoutID } from '@/entities/Product/interfaces.ts'

export default async function getFullDataProduct(id: string): Promise<IProduct | undefined> {
	const product = await getProduct(id)
	const productData = product.data() as IProductWithoutID | undefined

	if (!productData) return

	return {
		id: product.id,
		...productData
	}
}
