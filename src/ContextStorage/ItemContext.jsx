import { createContext, useEffect, useState } from "react";

// Create the userContext
export const ItemContext = createContext();


const ItemProvider = ({ children }) => {
    const [itemsCollection, setItemsCollection] = useState([]);
    const [searchCollection, setSearchCollection] = useState([]);
    const [searchKeyWord, setSearchKeyWord] = useState("");

    // call item for home page
    useEffect(()=>{
        
    }, [])
    // sending item data
    const result = {
        searchKeyWord,
        setSearchKeyWord,
        searchCollection,
        setSearchCollection
    };

    return (
        <ItemContext.Provider value={result}>
            {/* provide of itemContext */}
            {children}
        </ItemContext.Provider>
    );
};
export default ItemProvider;