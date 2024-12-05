import { useParams } from "react-router-dom";
import { HelmetFunc } from "../Utils/Helmet/Helmet";


const Search = () => {
    const { search } = useParams();
    const hastag = { hastag: search }
    console.log(hastag)
    return (
        <div className="w-full p-3 border">
            {/* helmet */}
            {HelmetFunc("Search")}
            Search
            {search}
        </div>
    );
}
export { Search }