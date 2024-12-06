// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_VARIABLE_apiKey,
    authDomain: import.meta.env.VITE_VARIABLE_authDomain,
    projectId: import.meta.env.VITE_VARIABLE_projectId,
    storageBucket: import.meta.env.VITE_VARIABLE_storageBucket,
    messagingSenderId: import.meta.env.VITE_VARIABLE_messagingSenderId,
    appId: import.meta.env.VITE_VARIABLE_appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);