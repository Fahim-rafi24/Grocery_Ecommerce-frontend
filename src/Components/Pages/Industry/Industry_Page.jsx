import { useParams } from "react-router-dom";



const Industry_Page = ()=>{
    const { name } = useParams(); // Name will hold the value from the URL
    // console.log(name)

    return(
        <div className="border w-full p-3">
        <p className="">Industry :</p>
        <p>{name}</p>
        </div>
    );
}
export { Industry_Page }