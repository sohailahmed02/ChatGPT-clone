import {getApp, getApps, initializeApp} from "firebase/app"
import {getFirestore} from "firebase/firestore"


// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYtMjZae_SpM-vkXta5kb-JVQBVQWWAWE",
  authDomain: "chatgpt-clone-sohail.firebaseapp.com",
  projectId: "chatgpt-clone-sohail",
  storageBucket: "chatgpt-clone-sohail.appspot.com",
  messagingSenderId: "655936456587",
  appId: "1:655936456587:web:2576409cd673cd3237d18e"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
//getApps provide the status of app session
//singelton pattern encoding
const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
const db = getFirestore(app); //database object

export {db} 

