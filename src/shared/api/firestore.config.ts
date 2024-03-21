import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
	apiKey: 'AIzaSyCHlGYa1TcLSzXBXrnJFj5KGZtL0gYRuVo',
	authDomain: 'restaurant-c742d.firebaseapp.com',
	projectId: 'restaurant-c742d',
	storageBucket: 'restaurant-c742d.appspot.com',
	messagingSenderId: '1021437132341',
	appId: '1:1021437132341:web:2a60f3a3368413d67efb7c',
	measurementId: 'G-XWECJPXRR1',
}

// initialize Firebase
export const app = initializeApp(firebaseConfig)

// analytics
export const analytics = getAnalytics(app)

// authorization
export const auth = getAuth();
export const googleAuthProvider = new GoogleAuthProvider()

// firestore
export const db = getFirestore(app);

// storage
export const storage = getStorage(app, 'gs://restaurant-c742d.appspot.com')
