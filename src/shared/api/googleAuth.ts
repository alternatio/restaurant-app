import { auth, googleAuthProvider } from '@/shared/api/firestore.config.ts'
import { getAuth, signInWithPopup, signOut } from 'firebase/auth'

export const signInWithGoogle = async () => {
	try {
		const result = await signInWithPopup(auth, googleAuthProvider)
		return result.user
	} catch (error) {
		console.error(error)
	}
}

export const signOutGoogle = async () => {
	try {
		const auth = getAuth()
		return await signOut(auth)
	} catch (error) {
		console.error(error)
	}
}
