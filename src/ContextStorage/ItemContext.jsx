import { createContext, useEffect, useState } from "react";

// Create the userContext
export const ItemContext = createContext();


const ItemProvider = ({ children }) => {
    // ues for all sidebar items
    const [itemsCollection, setItemsCollection] = useState([]);
    // only use for random search call
    const [searchCollection, setSearchCollection] = useState([]);
    const [searchKeyWord, setSearchKeyWord] = useState("");

    // call item for home page
    // useEffect(()=>{
        
    // }, [])
    // sending item data
    const result = {
        // for all sidebar items
        itemsCollection,
        setItemsCollection,
        // just for search field
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