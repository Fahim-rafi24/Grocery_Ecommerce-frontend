import { useEffect, useState } from "react";
import { FaBangladeshiTakaSign } from "react-icons/fa6";

const ProductCard = ({ obj }) => {
    const favourites_data = JSON.parse(localStorage.getItem("favouritesArrData") || "[]") || [];
    const [isFavourite, setIsFavourite] = useState(
        favourites_data.some(each => each._id === obj._id)
    );

    const addFavouritesHandeler = (obj) => {
        // set data in local storage
        const favouritesStorageTrue = localStorage.getItem("favouritesArrData");
        const favouritesArr = favouritesStorageTrue ? JSON.parse(localStorage.getItem("favouritesArrData") || "[]") : [];
        const newdata = [...favouritesArr, obj._id];
        localStorage.setItem("favouritesArrData", JSON.stringify(newdata));
        // hide this button from page
        setIsFavourite(true);
    }

    const removeFavouritesHandler = (obj) => {
        // Get data from local storage
        const favouritesStorageTrue = localStorage.getItem("favouritesArrData");
        let favouritesArr = favouritesStorageTrue ? JSON.parse(localStorage.getItem("favouritesArrData") || "[]") : [];
        favouritesArr = favouritesArr.filter(id => id !== obj._id);
        localStorage.setItem("favouritesArrData", JSON.stringify(favouritesArr));

        setIsFavourite(false);
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
                                onClick={() => removeFavouritesHandler(obj)}
                                className="btn btn-outline dark:text-green-400">Favourite Item</button>
                            :
                            <button
                                onClick={() => addFavouritesHandeler(obj)}
                                className="btn btn-outline dark:text-purple-600">Add favourites</button>
                    }
                    {/* <p className="hidden">if its true</p> */}
                </div>
            </div>
        </div>
    )
}
export default ProductCard