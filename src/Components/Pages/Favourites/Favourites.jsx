import { useEffect, useState } from "react";
import { HelmetFunc } from "../../Utils/Helmet/Helmet";
import { storyStatus } from "../../Utils/storyStatus/storyStatus";
import axios_without_cookies from "../../../Axios/axios_without_cookies";
import ProductCard from "../../Utils/ProductCard/ProductCard";


const Favourites = () => {
    const [favourites, setFavourites] = useState([]);
    useEffect(() => {
        const localFavourites = localStorage.getItem("favouritesArrData");
        if (localFavourites) {
            const arr = JSON.parse(localFavourites);
            // call api for load favourites card
            const callAPI = async () => {
                try {
                    const responsed = await axios_without_cookies.post("/IsCard_IsFav", { arr });
                    setFavourites(responsed.data.data);
                } catch (error) {
                    console.error("Error fetching products:", error);
                }
            };
            callAPI();
        }
        else {
            localStorage.setItem("favouritesArrData", JSON.stringify([]));
        }
    }, [])
    return (
        <div className="w-full p-3">
            {/* helmet */}
            {HelmetFunc("Favourites")}
            <p className="yuji-mai-regular text-[14px] md:text-[16px]">Favourites</p>
            {/* content */}
            <div className="md:w-4/6 mx-auto">
                {storyStatus("cart%favourites%popular")}
            </div>

            {/* call fevourites item */}
            <section className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 mb-32">
                {
                    Array.isArray(favourites) && favourites.length === 0
                        ?
                        <p className="text-[18px] font-light mt-10 roboto">No product found.</p>
                        :
                        favourites.map(each => (
                            <div key={each._id}>
                                <ProductCard obj={each}></ProductCard>
                            </div>
                        ))
                }
            </section>
        </div>
    );
}
export { Favourites }