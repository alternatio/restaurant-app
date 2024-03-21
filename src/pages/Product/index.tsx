import { useParams } from 'react-router-dom'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { User } from 'firebase/auth'
import Header from '@/widgets/Header'
import Loader from '@/shared/ui/Loader'
import getFullDataProduct from '@/pages/Product/api/getFullDataProduct.ts'
import { IProduct } from '@/entities/Product/interfaces.ts'
import getImagePath from '@/shared/api/downloadImage.ts'

interface ProductPageProps {
	user: User | undefined
	setUser: Dispatch<SetStateAction<User | undefined>>
}

export default function ProductPage(props: ProductPageProps) {
	const [product, setProduct] = useState<IProduct>()
	const [productImage, setProductImage] = useState('')
	const [loading, setLoading] = useState<boolean>(true)
	const { productId } = useParams()

	const initialResponse = async () => {
		setLoading(true)
		if (productId) {
			const product = await getFullDataProduct(productId)
			setProduct(product)
			if (!product?.image) return
			setProductImage(await getImagePath(product.image))
		}
		setLoading(false)
	}

	useEffect(() => {
		initialResponse()
	}, [])

	return <><Header {...props} />{loading ? <Loader /> : (
		<>
			<img src={productImage} alt={`productImage — ${product?.name}`} />
			<span>{product?.name}</span>
		</>
	)}</>
}
