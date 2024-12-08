import { useParams } from "react-router-dom";
import { HelmetFunc } from "../Utils/Helmet/Helmet";
import { Home_Serch_story } from "../Utils/storyStatus/Home_Serch_story";
import { useContext, useEffect, useState } from "react";
// axios
import axios_without_cookies from "../../Axios/axios_without_cookies";
import { ItemContext } from "../../ContextStorage/ItemContext";
import ProductCard from "../Utils/ProductCard/ProductCard";

const Search = () => {
    const { searchKeyWord, searchCollection, setSearchCollection } = useContext(ItemContext);
    const result = searchKeyWord.toLowerCase().split(" ");

    // call api for search
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios_without_cookies.get(`/search?data=${result}`);
                setSearchCollection(response?.data?.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                // end
            }
        };
        fetchProducts();
    }, [searchKeyWord]);

    return (
        <div className="w-full p-3">
            {/* helmet */}
            {HelmetFunc("Search")}

            {
                searchKeyWord !== "search" && searchKeyWord !== "" && <h2 className="text-xl font-bold mb-10">Search Results {searchKeyWord}</h2>
            }

            {/* story */}
            <Home_Serch_story></Home_Serch_story>

            {/* display search result */}
            <section className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
                {
                    Array.isArray(searchCollection) && searchCollection.length === 0
                        ?
                        <p className="text-[18px] font-light mt-10 roboto">No products found for your search. Search first properly.</p>
                        :
                        searchCollection.map(each => (
                            <div key={each._id}>
                                {ProductCard(each)}
                            </div>
                        ))
                }
            </section>
        </div>
    );
}
export { Search }