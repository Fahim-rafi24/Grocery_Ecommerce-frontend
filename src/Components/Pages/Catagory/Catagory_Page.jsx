import { Link, useParams } from "react-router-dom";
// icon
import { GoRelFilePath } from "react-icons/go";
import { HelmetFunc } from "../../Utils/Helmet/Helmet";
import { useContext, useEffect, useState } from "react";
import axios_without_cookies from "../../../Axios/axios_without_cookies";
import { ItemContext } from "../../../ContextStorage/ItemContext";
import ProductCard from "../../Utils/ProductCard/ProductCard";

const Catagory_Page = () => {
    const { Data } = useParams(); // Name will hold the value from the URL
    const [Industry, Catagory] = JSON.parse(Data);
    // display card
    const [cards, setCards] = useState([]);

    // context
    const { itemsCollection, setItemsCollection } = useContext(ItemContext);
    useEffect(() => {
        // Check if an object with the same name already exists in itemsCollection
        const isDuplicate = itemsCollection.some(item => item.name === Catagory);

        if (!isDuplicate) {
            // call api
            const fetchProducts = async () => {
                try {
                    const response = await axios_without_cookies.post(`/targeted/search`, {name: Catagory});
                    const obj = {
                        name: Catagory,
                        data: response?.data?.data || []
                    };
                    setItemsCollection(pre => [...pre, obj]);
                } catch (error) {
                    console.error("Error fetching products:", error);
                }
            };
            // call this async function
            fetchProducts();
        }
    }, [Catagory, itemsCollection])

    // take card data
    useEffect(() => {
        const result = itemsCollection?.find(item => item?.name === Catagory)?.data;
        setCards(result || [])
    }, [Catagory, itemsCollection])

    return (
        <div className="w-full p-3">
            {/* helmet */}
            {HelmetFunc(Catagory)}
            {/* top route path */}
            <div className="yuji-mai-regular text-[14px] md:text-[16px]">
                <Link
                    to={`/Industry/${Industry}`}>
                    <span className="hover:text-amber-500">{Industry}</span>
                </Link>
                <GoRelFilePath className="inline-block ml-2" />
                <Link>
                    <span className="hover:text-amber-500">{Catagory}</span>
                </Link>
            </div>

            {/* display search result */}
            <section className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-32">
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
export { Catagory_Page }