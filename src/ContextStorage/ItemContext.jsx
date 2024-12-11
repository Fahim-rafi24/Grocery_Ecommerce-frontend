import { createContext, useEffect, useState } from "react";

// Create the userContext
export const ItemContext = createContext();

const ItemProvider = ({ children }) => {
    // ues for all sidebar items
    const [itemsCollection, setItemsCollection] = useState(() => {
        const storedData = sessionStorage.getItem("itemsCollection");   // store all card data in session storage
        return storedData ? JSON.parse(storedData) : [];
    });
    // only use for random search call
    const [searchCollection, setSearchCollection] = useState([]);
    const [searchKeyWord, setSearchKeyWord] = useState("");

    const [favourites, setFavourites] = useState(() => {
        return JSON.parse(localStorage.getItem("favouritesArrData") || "[]");
    });

    // Sync itemsCollection with sessionStorage whenever it changes
    useEffect(() => {
        sessionStorage.setItem("itemsCollection", JSON.stringify(itemsCollection));
    }, [itemsCollection]);

    // sending item data
    const result = {
        // for all sidebar items
        itemsCollection,
        setItemsCollection,
        // just for search field
        searchKeyWord,
        setSearchKeyWord,
        searchCollection,
        setSearchCollection,
        // favourites card variable
        favourites,
        setFavourites
    };
    return (
        <ItemContext.Provider value={result}>
            {/* provide of itemContext */}
            {children}
        </ItemContext.Provider>
    );
};
export default ItemProvider;