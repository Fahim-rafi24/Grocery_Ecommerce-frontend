import { createContext, useEffect, useState } from "react";


// Create the ThemeContext
export const UserContext = createContext();



const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // fake user data
    const callUser = {
        "_id": 300,
        name: 'kazi rafi',
        avater: 'https://res-console.cloudinary.com/dwkf87vdp/media_explorer_thumbnails/5be91710b5855e759bc7c1c04384fe82/detailed',
        Permanent_location: "Vakutiya, jessore, Khulna, Bangladesh",
        current_location: "Vakutiya, jessore, Khulna, Bangladesh",
        Mobile_NO: "+8801784918086",
        email: 'kazirafibd@gmail.com'
    }

    useEffect(() => {
        if (!user) {
            // do this work
            setUser(callUser)
        }
    }, [user])

    // sending data
    const result = {
        user
    };

    return (
        <UserContext.Provider value={result}>
            {/* provide theme & set Theme */}
            {children}
        </UserContext.Provider>
    );
};
export default UserProvider;