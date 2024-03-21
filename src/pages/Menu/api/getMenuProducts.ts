import { getProducts } from '@/shared/api/controller.ts'

export default async function getMenuProducts() {
	return await getProducts(1000)
}