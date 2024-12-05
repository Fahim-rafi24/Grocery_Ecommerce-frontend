import { HelmetFunc } from "../../Utils/Helmet/Helmet";
import { storyStatus } from "../../Utils/storyStatus/storyStatus";


const Popular = () => {
    return (
        <div className="w-full p-3 border">
            {/* helmet */}
            {HelmetFunc("Popular")}
            <p className="yuji-mai-regular text-[14px] md:text-[16px]">Popular</p>
            {/* content */}
            <div className="md:w-4/6 mx-auto">
            {storyStatus("cart%favourites%popular")}
            </div>
        </div>
    );
}
export { Popular }