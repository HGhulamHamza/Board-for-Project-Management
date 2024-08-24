// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5835r-O7yJ-fIZ3hZLxU-0n7ADRngofE",
  authDomain: "project-management-a5f92.firebaseapp.com",
  projectId: "project-management-a5f92",
  storageBucket: "project-management-a5f92.appspot.com",
  messagingSenderId: "150412072278",
  appId: "1:150412072278:web:f6d72d644fa73d826eb2f7"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };