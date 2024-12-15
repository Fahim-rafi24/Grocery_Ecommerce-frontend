import { Link, useParams } from "react-router-dom";
import { HelmetFunc } from "../../Utils/Helmet/Helmet";
import { useContext, useEffect, useState } from "react";
import { ItemContext } from "../../../ContextStorage/ItemContext";
import axios_without_cookies from "../../../Axios/axios_without_cookies";
import ProductCard from "../../Utils/ProductCard/ProductCard";



const Industry_Page = () => {
    const { name } = useParams(); // Name will hold the value from the URL
    // display card
    const [cards, setCards] = useState([]);

    // context
    const { itemsCollection, setItemsCollection } = useContext(ItemContext);
    useEffect(() => {
        // Check if an object with the same name already exists in itemsCollection
        const isDuplicate = itemsCollection.some(item => item.name === name);

        if (!isDuplicate) {
            // call api
            const fetchProducts = async () => {
                try {
                    const response = await axios_without_cookies.post(`/targeted/search`, { name });
                    const obj = {
                        name,
                        data: response?.data?.data || []
                    };
                    setItemsCollection(pre => [...pre, obj]);
                } catch (error) {
                    // console.error("Error fetching products:", error);
                }
            };
            // call this async function
            fetchProducts();
        }
    }, [name, itemsCollection])

    // take card data
    useEffect(() => {
        const result = itemsCollection?.find(item => item?.name === name)?.data;
        setCards(result || [])
    }, [name, itemsCollection])

    return (
        <div className="w-full p-3">
            {/* helmet */}
            {HelmetFunc(name)}
            {/* top route path */}
            <div className="yuji-mai-regular text-[14px] md:text-[16px]">
                <Link>
                    <span className="hover:text-amber-500">{name}</span>
                </Link>
            </div>

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
export { Industry_Page }