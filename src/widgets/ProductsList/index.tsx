import style from './productsList.module.scss'
import { IProducts } from '@/entities/Product/interfaces.ts'
import ProductCard from '@/entities/Product/ProductCard'

interface ProductsListProps {
	products?: IProducts
}

export default function ProductsList({ products }: ProductsListProps) {
	return <div className={style.list}>
		{products?.map(product => {
			return <ProductCard product={product} />
		})}
	</div>
}