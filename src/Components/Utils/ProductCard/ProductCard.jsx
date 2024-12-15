import { useContext, useEffect, useMemo, useState } from "react";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { ItemContext } from "../../../ContextStorage/ItemContext";
import { IoIosAdd } from "react-icons/io";
import { UserContext } from "../../../ContextStorage/UserContext";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";

const ProductCard = ({ obj }) => {
    const objId = String(obj._id);
    const { user } = useContext(UserContext);
    const { favourites, setFavourites, carts, addToCart, removeFromCart } = useContext(ItemContext);
    const [isFavourite, setIsFavourite] = useState(false);
    const [inCart, setInCart] = useState(false);
    const [itemCount, setItemCount] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        setIsFavourite(favourites.includes(objId));
    }, [favourites, objId]);

    // cart code
    useEffect(() => {
        setInCart(carts.includes(objId));
        setItemCount(carts.filter(id => id === objId).length);
    }, [carts, objId]);

    const addToCartHandler = () => {
        if (!user?.name) {
            // first give a alart
            Swal.fire({
                title: "Login First",
                text: "You won't be able to add item!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Login"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/login", { state: { from: location.pathname } })
                }
            });
            return
        }
        addToCart(objId);
    };

    const removeFromCartHandler = () => {
        removeFromCart(objId);
    };

    const addMultypleTime = () => {
        addToCart(objId);
    }

    // favourite code
    const addFavouritesHandler = () => {
        if (!favourites.includes(objId)) {
            const updatedFavourites = [...favourites, objId];
            try {
                localStorage.setItem("favouritesArrData", JSON.stringify(updatedFavourites));
                setFavourites(updatedFavourites);
            } catch (error) {
                // console.error("Failed to save to localStorage:", error);
                // alert("Failed to update favourites. Please try again.");
            }
        }
        else {
            // alert("Item already in favourites:", objId);
        }
    };
    const removeFavouritesHandler = () => {
        const updatedFavourites = favourites.filter((id) => id !== objId);
        try {
            localStorage.setItem("favouritesArrData", JSON.stringify(updatedFavourites));
            setFavourites(updatedFavourites);
        } catch (error) {
            // console.error("Failed to save to localStorage:", error);
            // alert("Failed to update favourites. Please try again.");
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

                {
                    itemCount > 0 ? <>
                        {/* <button className="btn" onClick={addMultypleTime}>Add More Item</button> */}
                        <p
                            className="mt-2 flex justify-center items-center"
                        >In Cart: {itemCount} / 5
                            <button onClick={addMultypleTime}> <IoIosAdd className="text-3xl ml-2 hover:text-green-600" /> </button>
                        </p>
                    </> : ""
                }
                <div className="flex justify-between">
                    {inCart ? (
                        <button onClick={removeFromCartHandler} className="btn btn-outline text-blue-500">
                            Remove from Cart
                        </button>
                    ) : (
                        <button onClick={addToCartHandler} className="btn btn-primary">
                            Add Card
                        </button>
                    )}

                    {isFavourite ? (
                        <button onClick={removeFavouritesHandler} className="btn btn-outline dark:text-black">
                            Favourite Item
                        </button>
                    ) : (
                        <button onClick={addFavouritesHandler} className="btn btn-outline text-purple-600">
                            Add Favourites
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
export default ProductCard