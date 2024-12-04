import { useParams } from "react-router-dom";



const Catagory_Page = ()=>{
    const { name } = useParams(); // Name will hold the value from the URL
    // console.log(name)
    
    return(
        <div className="border w-full p-3">
        <p className="">Catagory :</p>
        <p>{name}</p>
        </div>
    );
}
export { Catagory_Page }