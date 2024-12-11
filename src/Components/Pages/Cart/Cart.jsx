import { useContext, useEffect, useState } from "react";
import { HelmetFunc } from "../../Utils/Helmet/Helmet";
import { storyStatus } from "../../Utils/storyStatus/storyStatus";
import { ItemContext } from "../../../ContextStorage/ItemContext";
import axios_without_cookies from "../../../Axios/axios_without_cookies";
import ProductCard from "../../Utils/ProductCard/ProductCard.jsx";



const Cart = () => {
    const { carts } = useContext(ItemContext);
    const newArr = [...new Set(carts)];

    // cart state
    const [cartList, setCartList] = useState([]);
    useEffect(() => {
        const callAPI = async () => {
            const response = await axios_without_cookies.post("/IsCard_IsFav", { arr: newArr })
            setCartList(response.data.data);
        }
        callAPI();
    }, [])
    return (
        <div className="w-full p-3">
            {/* helmet */}
            {HelmetFunc("Cart")}
            <p className="yuji-mai-regular text-[14px] md:text-[16px]">Cart</p>
            {/* content */}
            <div className="md:w-4/6 mx-auto">
                {storyStatus("cart%favourites%popular")}
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
        </div>
    );
}
export { Cart }