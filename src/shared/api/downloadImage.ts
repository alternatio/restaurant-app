import { getDownloadURL, ref } from 'firebase/storage'
import { storage } from '@/shared/api/firestore.config.ts'

export default async function getImagePath(imageName: string) {
	const imageRef = ref(storage, `productImages/${imageName}`)
	return await getDownloadURL(imageRef)
}
