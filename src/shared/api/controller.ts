import {
	addDoc,
	collection,
	doc,
	DocumentData,
	getDoc,
	getDocs,
	limit,
	query,
	setDoc,
	where,
} from 'firebase/firestore'
import { db } from '@/shared/api/firestore.config.ts'
import { IProducts } from '@/entities/Product/interfaces.ts'
import { IOrders, IOrderWithoutID } from '@/entities/Order/interfaces.ts'

// --- INITIAL FUNCTIONS ---
// get doc in firestore
export const getDocInFirestore = async (
	collectionName: string,
	docName: string
) => {
	return await getDoc(doc(db, collectionName, docName))
}

// get many docs in firestore
export const getDocsInFirestore = async (
	collectionName: string,
	limitDocs: number = 10
) => {
	const arrayOfDocs: DocumentData[] = []

	const q = query(collection(db, collectionName), limit(limitDocs))
	const querySnapshot = await getDocs(q)
	querySnapshot.forEach(doc => {
		arrayOfDocs.push({
			id: doc.id,
			...doc.data(),
		})
	})

	return arrayOfDocs
}

// add item in firestore
export const addItemInFirestore = async (
	collectionName: string,
	data: object
) => {
	await addDoc(collection(db, collectionName), data)
}

// set item in firestore
export const setItemInFirestore = async (
	collectionName: string,
	docName: string,
	data: object
) => {
	await setDoc(doc(db, collectionName, docName), data)
}

// --- MAIN FUNCTIONS ---
export const getProducts = async (limit: number = 10) => {
	return (await getDocsInFirestore('products', limit)) as IProducts
}

export const getProduct = async (id: string) => {
	return await getDocInFirestore('products', id)
}

export const getUserOrders = async (
	userUID: string
): Promise<IOrders | undefined> => {
	const ordersQuery = query(
		collection(db, 'orders'),
		where('userUID', '==', userUID)
	)

	try {
		const querySnapshot = await getDocs(ordersQuery)

		return querySnapshot.docs.map((doc: DocumentData) => ({
			id: doc.id,
			userUID: doc.data().userUID,
			address: doc.data().address,
			payMethod: doc.data().payMethod,
			products: doc.data().products,
		}))
	} catch (error) {
		console.error('Error fetching user orders:', error)
	}
}

export const createOrder = async (order: IOrderWithoutID) => {
	return await addItemInFirestore('orders', order)
}
