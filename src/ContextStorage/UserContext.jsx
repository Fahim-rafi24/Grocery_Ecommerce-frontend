import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./FirebaseContext";
import axios_with_cookies from "../Axios/axios_with_cookies";

// Create the userContext
export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [logOutVisible, setLogOutVisible] = useState(false);
    // call firebase Email
    const { firebaseEmail } = useContext(AuthContext);

    // call user
    useEffect(() => {
        if (firebaseEmail) {
            serverUserInfoCall()
        }
        else {
            setUser(null);
        }
    }, [firebaseEmail])
    // call this function if firebase send Any user
    const serverUserInfoCall = async () => {
        try {
            const response = await axios_with_cookies.post("/logedInUser", { email: firebaseEmail });
            setUser(response.data.data);
        } catch (error) {
            console.error(error);
        }
    }

    // logOutVisible
    useEffect(() => {
        if (user) {
            setLogOutVisible(true)
        } else {
            setLogOutVisible(false)
        }
    }, [user])

    // sending data
    const result = {
        user, setUser, logOutVisible
    };

    return (
        <UserContext.Provider value={result}>
            {/* provide user & set Theme */}
            {children}
        </UserContext.Provider>
    );
};
export default UserProvider;