import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import auth from "../FirebaseAuth/firebase.config";
import Swal from "sweetalert2";

// Create the authContext
export const AuthContext = createContext();

const FirebaseContext = ({ children }) => {
    // auto detected user
    const [firebaseEmail, setEmail] = useState(null);

    // auto call user with effect
    useEffect(() => {
        if (!firebaseEmail) {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    setEmail(user.email);
                } else {
                    setEmail(null); // Handle case when no user is signed in
                }
            });
        }
    }, [firebaseEmail]);

    // sign up new user
    const signNewUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }
    // login user
    const logInOldUser = (email, password) =>{
        return signInWithEmailAndPassword(auth, email, password);
    }
    // logout user
    const logoutUser = () => {
        signOut(auth)
            .then(() => {
                // Sign-out successful.
                setEmail(null);
                Swal.fire("Sign-out successful.");
            })
            .catch(err => {
                console.log(err);
            })
    }


    const result = {
        // only use for userContext
        firebaseEmail,
        signNewUser,
        logInOldUser,
        logoutUser
    };
    return (
        <AuthContext.Provider value={result}>
            {/* provide user Auth */}
            {children}
        </AuthContext.Provider>
    );
}
export default FirebaseContext