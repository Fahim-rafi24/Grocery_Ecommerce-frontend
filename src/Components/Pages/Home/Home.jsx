import { HelmetFunc } from "../../Utils/Helmet/Helmet";



const Home = () => {
    return (
        <div className="w-full p-3 border">
            {/* helmet */}
            {HelmetFunc("Home")}
            home
        </div>
    );
}
export { Home }