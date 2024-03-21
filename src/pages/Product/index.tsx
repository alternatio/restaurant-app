import { useParams } from 'react-router-dom'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { User } from 'firebase/auth'
import Header from '@/widgets/Header'
import Loader from '@/shared/ui/Loader'
import getFullDataProduct from '@/pages/Product/api/getFullDataProduct.ts'
import { IProduct } from '@/entities/Product/interfaces.ts'
import getImagePath from '@/shared/api/downloadImage.ts'
import { useQuery } from 'react-query'
import Content from '@/pages/Product/Content'

interface ProductPageProps {
	user: User | undefined
	setUser: Dispatch<SetStateAction<User | undefined>>
}

export default function ProductPage(props: ProductPageProps) {
	const { productId } = useParams()
	const [productImage, setProductImage] = useState('')

	const { data: product, isLoading } = useQuery<IProduct | undefined>(
		['product', productId],
		() => getFullDataProduct(productId),
		{
			enabled: !!productId,
		}
	)

	const fetchProductImage = async (imageName: string) => {
		setProductImage(await getImagePath(imageName))
	}

	useEffect(() => {
		if (!product?.image) return
		fetchProductImage(product.image)
	}, [product])

	return (
		<>
			<Header {...props} />
			{isLoading ? (
				<Loader />
			) : (
				<Content user={props.user} product={product} image={productImage} />
			)}
		</>
	)
}
