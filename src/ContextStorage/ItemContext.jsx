import { createContext } from "react";

// Create the userContext
export const itemContext = createContext();


const ItemProvider = ({ children }) => {
    

    // sending item data
    const result = {
    };

    return (
        <itemContext.Provider value={result}>
            {/* provide of itemContext */}
            {children}
        </itemContext.Provider>
    );
};
export default ItemProvider;