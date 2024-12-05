import { useParams } from "react-router-dom";


const Search =() =>{
    const {search} = useParams();
    const hastag = {hastag: search}
    console.log(hastag)
    return(
        <div className="w-full p-3 border">
        Search
        {search}
        </div>
    );
}
export { Search }