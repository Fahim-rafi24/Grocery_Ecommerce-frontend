import { useContext, useEffect, useState } from "react";
import { HelmetFunc } from "../../Utils/Helmet/Helmet";
import { storyStatus } from "../../Utils/storyStatus/storyStatus";
import { ItemContext } from "../../../ContextStorage/ItemContext";
import axios_without_cookies from "../../../Axios/axios_without_cookies";
import ProductCard from "../../Utils/ProductCard/ProductCard.jsx";
import { UserContext } from "../../../ContextStorage/UserContext.jsx";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const Cart = () => {
    const { carts } = useContext(ItemContext);
    const { user } = useContext(UserContext);
    const newArr = [...new Set(carts)];
    const navigate = useNavigate();

    // cart state
    const [cartList, setCartList] = useState([]);
    const [totalCost, setCostTotal] = useState(0);
    useEffect(() => {
        const callAPI = async () => {
            const response = await axios_without_cookies.post("/IsCard_IsFav", { arr: newArr })
            setCartList(response.data.data);
        }
        callAPI();
    }, [])

    useEffect(() => {
        // call total cost api
        const fetchProducts = async () => {
            try {
                const response = await axios_without_cookies.post(`/calculate-total`, { productIds: carts });
                setCostTotal(response.data.data);
            } catch (error) {
                setCostTotal("Something May Worng... Load Page Again");
                console.error("Error fetching products:", error);
            }
        };
        // call this async function
        fetchProducts();
    }, [carts])

    const handleOrderBtn = () => {
        if (!user?.name && !user.email) {
            return navigate("/login")
        } else if (!user?.Mobile_NO || !user?.Ocopation || !user?.current_location) {
            Swal.fire({
                title: "All user info is required",
                text: "Complete first your Account Details",
                icon: "error",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Update Account"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate(`/user/${user._id}`, {state : {from: "/cart"}})
                }
            });
        } else {
            console.log("do the payment")
        }
    }

    return (
        <div className="w-full p-3">
            {/* helmet */}
            {HelmetFunc("Cart")}
            <p className="yuji-mai-regular text-[14px] md:text-[16px]">Cart</p>

            {/* total Cost */}
            <div className="flex flex-col md:flex-row justify-between my-5">
                <h3 className="text-black dark:text-purple-500 font-bold text-center md:text-start text-4xl">Total Cost : <span>{totalCost}</span> TK</h3>
                <button
                    onClick={handleOrderBtn}
                    className="btn btn-outline mt-3 md:mt-0 mx-10 md:mx-0 px-10">Order</button>
            </div>

            {/* display cart items */}
            <section className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 mb-32">
                {
                    Array.isArray(cartList) && cartList.length === 0
                        ?
                        <p className="text-[18px] font-light mt-10 roboto">No product found.</p>
                        :
                        cartList.map(each => (
                            <div key={each._id}>
                                <ProductCard obj={each}></ProductCard>
                            </div>
                        ))
                }
            </section>

            {/* content */}
            <div className="md:w-4/6 mx-auto">
                {storyStatus("cart%favourites%popular")}
            </div>
        </div>
    );
}
export { Cart }