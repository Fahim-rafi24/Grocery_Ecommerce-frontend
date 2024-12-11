import { useContext, useEffect, useState } from "react";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { ItemContext } from "../../../ContextStorage/ItemContext";

const ProductCard = ({ obj }) => {
    const objId = String(obj._id);
    const {favourites, setFavourites} = useContext(ItemContext);

    const [isFavourite, setIsFavourite] = useState(false);

    useEffect(() => {
        setIsFavourite(favourites.includes(objId));
    }, [favourites, objId]);

    const addFavouritesHandler = () => {
        if (!favourites.includes(objId)) {
            const updatedFavourites = [...favourites, objId];
            try {
                localStorage.setItem("favouritesArrData", JSON.stringify(updatedFavourites));
                setFavourites(updatedFavourites);
            } catch (error) {
                console.error("Failed to save to localStorage:", error);
                alert("Failed to update favourites. Please try again.");
            }
        }
        else {
            console.log("Item already in favourites:", objId);
            alert("Item already in favourites:", objId);
        }
    };
    const removeFavouritesHandler = () => {
        const updatedFavourites = favourites.filter((id) => id !== objId);
        try {
            localStorage.setItem("favouritesArrData", JSON.stringify(updatedFavourites));
            setFavourites(updatedFavourites);
        } catch (error) {
            console.error("Failed to save to localStorage:", error);
            alert("Failed to update favourites. Please try again.");
        }
    };

    return (
        <div className="card bg-white dark:text-black h-[70vh] md:h-[45vh] shadow-2xl jaro">
            <figure className="p-2 h-3/6">
                <img
                    src={obj.img}
                    alt={obj._id}
                    className="h-full" />
            </figure>
            <div className="card-body text-center">
                <h2 className="font-light text-2xl yuji-mai-regular text-purple-600">{obj.name}</h2>
                <p className="text-[20px]   ">Unit : <span>{obj.product_Volume}</span></p>
                <p className="text-[20px]">Available In Store : <span className="text-red-400">{obj.store_Volume} Unit</span></p>
                <p className="font-semibold text-xl roboto">Price : {obj.Price} <FaBangladeshiTakaSign className="inline-block" /></p>
                <div className=" flex justify-between yuji-mai-regular">
                    <button
                        // onClick={""} this button for add to cart
                        className="btn btn-primary">Add Card</button>
                    {
                        isFavourite ?
                            <button
                                onClick={removeFavouritesHandler}
                                className="btn btn-outline text-blue-500 dark:text-green-400">Favourite Item</button>
                            :
                            <button
                                onClick={addFavouritesHandler}
                                className="btn btn-outline dark:text-purple-600">Add favourites</button>
                    }
                    {/* <p className="hidden">if its true</p> */}
                </div>
            </div>
        </div>
    )
}
export default ProductCard