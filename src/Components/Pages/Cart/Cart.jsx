import { HelmetFunc } from "../../Utils/Helmet/Helmet";
import { storyStatus } from "../../Utils/storyStatus/storyStatus";



const Cart = () => {
    return (
        <div className="w-full p-3 border">
            {/* helmet */}
            {HelmetFunc("Cart")}
            <p className="yuji-mai-regular text-[14px] md:text-[16px]">Cart</p>
            {/* content */}
            <div className="md:w-4/6 mx-auto">
            {storyStatus("cart%favourites%popular")}
            </div>
        </div>
    );
}
export { Cart }