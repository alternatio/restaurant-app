import { Dispatch, SetStateAction } from 'react'
import { User } from 'firebase/auth'
import { signInWithGoogle, signOutGoogle } from '@/shared/api/googleAuth.ts'

// sign in method
export const userSignIn = async (setUser: Dispatch<SetStateAction<User | undefined>>) => {
	const result = await signInWithGoogle()
	localStorage.setItem('user', JSON.stringify(result))
	setUser(result)
}

// sign out method
export const userSignOut = async (setUser: Dispatch<SetStateAction<User | undefined>>) => {
	await signOutGoogle()
	localStorage.removeItem('user')
	setUser(undefined)
}
