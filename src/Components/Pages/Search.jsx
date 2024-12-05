import { useParams } from "react-router-dom";
import { HelmetFunc } from "../Utils/Helmet/Helmet";
import { Home_Serch_story } from "../Utils/storyStatus/Home_Serch_story";


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
            {/* story */}
            <Home_Serch_story></Home_Serch_story>
        </div>
    );
}
export { Search }