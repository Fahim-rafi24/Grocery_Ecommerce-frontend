import { HelmetFunc } from "../../Utils/Helmet/Helmet";



const Cart = () => {
    return (
        <div className="w-full p-3 border">
            {/* helmet */}
            {HelmetFunc("Cart")}
            cart
        </div>
    );
}
export { Cart }