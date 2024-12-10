import { HelmetFunc } from "../../Utils/Helmet/Helmet";
import { Link, useNavigate } from "react-router-dom";
// context
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../ContextStorage/UserContext";
import { ItemContext } from "../../../ContextStorage/ItemContext";
// alart
import Swal from "sweetalert2";
// story
import { Home_Serch_story } from "../../Utils/storyStatus/Home_Serch_story";
import axios_without_cookies from "../../../Axios/axios_without_cookies";
import ProductCard from "../../Utils/ProductCard/ProductCard";



const Home = () => {
    const isHome = "home";  // decleair where & what data user call
    const [cards, setCards] = useState([]);
    // navigate
    const navigate = useNavigate();

    // user data context
    const { user } = useContext(UserContext);
    const { itemsCollection, setItemsCollection } = useContext(ItemContext);
    const filterd_product = ["200", "100", "300", "200"];

    useEffect(() => {
        // Check if an object with the same name already exists in itemsCollection
        const isDuplicate = itemsCollection.some(item => item.name === isHome);

        if (!isDuplicate) {
            // call api
            const fetchProducts = async () => {
                try {
                    // first time call just give empty arr
                    const response = await axios_without_cookies.post(`/isHome`, {filterd_product: []});
                    const obj = {
                        name: isHome,
                        data: response?.data?.data || []
                    };
                    setItemsCollection(pre => [...pre, obj]);
                }
                catch (error) {
                    console.error("Error fetching products:", error);
                }
            };
            // call this async function
            fetchProducts();
        }
    }, [isHome, itemsCollection])

    // take card data
    useEffect(() => {
        const result = itemsCollection?.find(item => item?.name === isHome)?.data;
        setCards(result || [])
    }, [isHome, itemsCollection])

    // admin page open func
    const adminHeandelFunc = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You Need To Open Admin Page!",
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then((result) => {
            if (result.isConfirmed) {
                // open admin page
                navigate('/admin')
                Swal.fire({
                    title: "Open Admin Page",
                    text: "",
                    icon: "success"
                });
            }
        });
    }

    return (
        <div className="w-full p-3">
            {/* helmet */}
            {HelmetFunc("Home")}
            <p className="yuji-mai-regular text-[14px] md:text-[16px]">home</p>
            {/* admin Root btn */}
            <div className="py-5">
                {
                    user?.isAdmin === true && <button
                        onClick={adminHeandelFunc}
                        className="btn text-xl font-bold rounded-lg px-10 bg-primary hover:text-white hover:bg-purple-400 dark:text-black dark:hover:bg-slate-50"
                    >Admin Page</button>
                }
            </div>
            {/* story */}
            <Home_Serch_story></Home_Serch_story>

            {/* display search result */}
            <section className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 mb-32">
                {
                    Array.isArray(cards) && cards.length === 0
                        ?
                        <p className="text-[18px] font-light mt-10 roboto">No product found for your search.</p>
                        :
                        cards.map(each => (
                            <div key={each._id}>
                                <ProductCard obj={each}></ProductCard>
                            </div>
                        ))
                }
            </section>
            
        </div>
    );
}
export { Home }