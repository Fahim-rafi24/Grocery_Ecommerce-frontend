import { HelmetFunc } from "../../Utils/Helmet/Helmet";
import { storyStatus } from "../../Utils/storyStatus/storyStatus";
import { useContext, useEffect, useState } from "react";
import { ItemContext } from "../../../ContextStorage/ItemContext";
import ProductCard from "../../Utils/ProductCard/ProductCard";
import axios_without_cookies from "../../../Axios/axios_without_cookies";


const Popular = () => {
    const isPopuler = "Popular";
    // display card
    const [cards, setCards] = useState([]);

    // context
    const { itemsCollection, setItemsCollection } = useContext(ItemContext);
    useEffect(() => {
        // Check if an object with the same name already exists in itemsCollection
        const isDuplicate = itemsCollection.some(item => item.name === isPopuler);

        if (!isDuplicate) {
            // call api
            const fetchProducts = async () => {
                try {
                    const response = await axios_without_cookies.get(`/isPopuler`);
                    const obj = {
                        name: isPopuler,
                        data: response?.data?.data || []
                    };
                    setItemsCollection(pre => [...pre, obj]);
                }
                catch (error) {
                    // console.error("Error fetching products:", error);
                }
            };
            // call this async function
            fetchProducts();
        }
    }, [isPopuler, itemsCollection])

    // take card data
    useEffect(() => {
        const result = itemsCollection?.find(item => item?.name === isPopuler)?.data;
        setCards(result || [])
    }, [isPopuler, itemsCollection])

    return (
        <div className="w-full p-3">
            {/* helmet */}
            {HelmetFunc("Popular")}
            <p className="yuji-mai-regular text-[14px] md:text-[16px]">Popular</p>
            {/* content */}
            <div className="md:w-4/6 mx-auto">
                {storyStatus("cart%favourites%popular")}
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
export { Popular }