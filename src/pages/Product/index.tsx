import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { getStorage } from "firebase/storage";
import { app } from '@/shared/api/firestore.config.ts'

export default function ProductPage() {
	const { productId } = useParams();

	useEffect(() => {
		const storage = getStorage(app, 'gs://restaurant-c742d.appspot.com')

		console.log(productId, storage)
	})


	return <span style={{fontWeight: 700, fontSize: 360}}>{productId}</span>
}