import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import auth from "../FirebaseAuth/firebase.config";

// Create the authContext
export const AuthContext = createContext();

const FirebaseContext = ({ children }) => {
    // auto detected user
    const [firebaseEmail, setEmail] = useState(null);
    useEffect(() => {
        // auto call user
        onAuthStateChanged(auth, (user)=>{
            if (user) {
                setEmail(user.email);
            }
            else{
                // nothing
                setEmail(user)
            }
        })
    }, [])

    // sign up new user
    const signNewUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }


    const result = {
        // only use for userContext
        firebaseEmail,
        signNewUser
    };
    return (
        <AuthContext.Provider value={result}>
            {/* provide user & set Theme */}
            {children}
        </AuthContext.Provider>
    );
}
export default FirebaseContext