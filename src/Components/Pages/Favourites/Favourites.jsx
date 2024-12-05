import { HelmetFunc } from "../../Utils/Helmet/Helmet";
import { storyStatus } from "../../Utils/storyStatus/storyStatus";


const Favourites = () => {
    return (
        <div className="w-full p-3 border">
            {/* helmet */}
            {HelmetFunc("Favourites")}
            <p className="yuji-mai-regular text-[14px] md:text-[16px]">Favourites</p>
            {/* content */}
            <div className="md:w-4/6 mx-auto">
            {storyStatus("cart%favourites%popular")}
            </div>
        </div>
    );
}
export { Favourites }