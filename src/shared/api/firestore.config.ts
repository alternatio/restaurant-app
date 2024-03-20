// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyCHlGYa1TcLSzXBXrnJFj5KGZtL0gYRuVo",
	authDomain: "restaurant-c742d.firebaseapp.com",
	projectId: "restaurant-c742d",
	storageBucket: "restaurant-c742d.appspot.com",
	messagingSenderId: "1021437132341",
	appId: "1:1021437132341:web:2a60f3a3368413d67efb7c",
	measurementId: "G-XWECJPXRR1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);