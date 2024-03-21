import { addDoc, collection, doc, DocumentData, getDoc, getDocs, limit, query, setDoc } from 'firebase/firestore'
import { db } from '@/shared/api/firestore.config.ts'
import { IProducts, IProductsWIthCount } from '@/entities/Product/interfaces.ts'
import { User } from 'firebase/auth'
import { IOrderWithoutID } from '@/entities/Order/interfaces.ts'

// --- INITIAL FUNCTIONS ---
// get doc in firestore
export const getDocInFirestore = async (collectionName: string, docName: string) => {
	return await getDoc(doc(db, collectionName, docName))
}

// get many docs in firestore
export const getDocsInFirestore = async (collectionName: string, limitDocs: number = 10) => {
	const arrayOfDocs: DocumentData[] = []

	const q = query(collection(db, collectionName), limit(limitDocs))
	const querySnapshot = await getDocs(q)
	querySnapshot.forEach((doc) => {
		arrayOfDocs.push({
			id: doc.id,
			...doc.data()
		})
	})

	return arrayOfDocs
}

// add item in firestore
export const addItemInFirestore = async (collectionName: string, data: object) => {
	await addDoc(collection(db, collectionName), data)
}

// set item in firestore
export const setItemInFirestore = async (collectionName: string, docName: string, data: object) => {
	await setDoc(doc(db, collectionName, docName), data)
}



// --- MAIN FUNCTIONS ---
export const getProducts = async (limit: number = 10) => {
	return await getDocsInFirestore('products', limit) as IProducts
}

export const getProduct = async (id: string) => {
	return await getDocInFirestore('products', id)
}

export const createOrder = async (user: User, products: IProductsWIthCount) => {
	const order: IOrderWithoutID = {
		userUID: user.uid,
		products: products
	}

	return await addItemInFirestore('orders', order)
}