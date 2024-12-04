import { useParams } from "react-router-dom";



const SubCatagory_Page = ()=>{
    const { name } = useParams(); // Name will hold the value from the URL
    // console.log(name)
    
    return(
        <div className="border w-full p-3">
        <p className="">SubCatagory :</p>
        <p>{name}</p>
        </div>
    );
}
export { SubCatagory_Page }