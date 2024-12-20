import { createContext, useEffect, useState } from "react";

// Create the userContext
export const ItemContext = createContext();

const ItemProvider = ({ children }) => {
    // ues for all sidebar items
    const [itemsCollection, setItemsCollection] = useState(() => {
        const storedData = sessionStorage.getItem("itemsCollection");   // store all card data in session storage
        if (storedData) {
            sessionStorage.setItem("itemsCollection", JSON.stringify([]))
            return [];
        }
        return storedData ? JSON.parse(storedData) : [];
    });
    // only use for random search call
    const [searchCollection, setSearchCollection] = useState([]);
    const [searchKeyWord, setSearchKeyWord] = useState("");

    // store home page item's _id
    const [home_ids, setHome_ids] = useState([]);
    useEffect(()=>{
        sessionStorage.setItem("home_ids", JSON.stringify(home_ids));
    },[home_ids])

    // Sync itemsCollection with sessionStorage whenever it changes
    useEffect(() => {
        sessionStorage.setItem("itemsCollection", JSON.stringify(itemsCollection));
    }, [itemsCollection]);

    // use for store favourite items
    const [favourites, setFavourites] = useState(() => {
        return JSON.parse(localStorage.getItem("favouritesArrData") || "[]");
    });

    // use for store cart items
    const [carts, setCarts] = useState(() => {
        return JSON.parse(localStorage.getItem("Cart") || "[]")  // cart code
    });

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("Cart", JSON.stringify(carts));
    }, [carts]);

    // Add to cart function
    const addToCart = (itemId) => {
        setCarts((prevCarts) => {
            const itemCount = prevCarts.filter((id) => id === itemId).length;
            if (itemCount < 5) {
                return [...prevCarts, itemId];
            }
            return prevCarts;
        });
    };
    // Remove from cart function
    const removeFromCart = (itemId) => {
        setCarts((prevCarts) => {
            const updatedCarts = prevCarts.filter((id) => id !== itemId);
            return updatedCarts;
        });
    };

    // sending item data
    const result = {
        // filter same card to display in home
        home_ids,
        setHome_ids,
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
        setFavourites,
        // cart
        carts,
        setCarts,
        addToCart,
        removeFromCart
    };
    return (
        <ItemContext.Provider value={result}>
            {/* provide of itemContext */}
            {children}
        </ItemContext.Provider>
    );
};
export default ItemProvider;