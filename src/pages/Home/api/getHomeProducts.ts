import { getProducts } from '@/shared/api/controller.ts'

export default async function getHomeProducts() {
	return await getProducts(3)
}
