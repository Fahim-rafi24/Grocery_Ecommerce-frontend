import { createContext, useEffect, useState } from "react";

// Create the userContext
export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [logOutVisible, setLogOutVisible] = useState(false);

    // fake user data
    const callUser = {
        "_id": 300,
        name: 'kazi rafi',
        // avater: 'https://chaldn.com/_mpimage/popular?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D95790&q=best&v=1&m=40&webp=1&alpha=1',
        Permanent_location: "Vakutiya, jessore, Khulna, Bangladesh",
        current_location: "Vakutiya, jessore, Khulna, Bangladesh",
        Mobile_NO: "+8801784918086",
        isAdmin : true,
        email: 'kazirafibd@gmail.com'
    }
    // call user
    useEffect(() => {
        if (!user) {
            // call user with fireBase
            // setUser(callUser);
        }
    }, [user])

    // logOutVisible
    useEffect(()=>{
        if (user) {
            setLogOutVisible(true)
        } else{
            setLogOutVisible(false)
        }
    },[user])

    // sending data
    const result = {
        user, logOutVisible
    };

    return (
        <UserContext.Provider value={result}>
            {/* provide user & set Theme */}
            {children}
        </UserContext.Provider>
    );
};
export default UserProvider;