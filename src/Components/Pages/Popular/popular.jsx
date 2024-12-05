import { HelmetFunc } from "../../Utils/Helmet/Helmet";


const Popular = () => {
    return (
        <div className="w-full p-3 border">
            {/* helmet */}
            {HelmetFunc("Popular")}
            Popular
        </div>
    );
}
export { Popular }