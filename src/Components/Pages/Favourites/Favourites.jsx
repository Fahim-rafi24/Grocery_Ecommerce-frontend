import { HelmetFunc } from "../../Utils/Helmet/Helmet";


const Favourites = () => {
    return (
        <div className="w-full p-3 border">
            {/* helmet */}
            {HelmetFunc("Favourites")}
            Favourites
        </div>
    );
}
export { Favourites }