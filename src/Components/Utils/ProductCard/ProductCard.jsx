import { FaBangladeshiTakaSign } from "react-icons/fa6";

const ProductCard = ({obj}) => {
    return (
        <div className="card bg-white dark:text-black h-[70vh] md:h-[45vh] shadow-2xl jaro">
            <figure className="p-2 h-3/6">
                <img
                    src={obj.img}
                    alt={obj._id}
                    className="h-full"/>
            </figure>
            <div className="card-body text-center">
                <h2 className="font-light text-2xl yuji-mai-regular text-purple-600">{obj.name}</h2>
                <p className="text-[20px]   ">Unit : <span>{obj.product_Volume}</span></p>
                <p className="text-[20px]">Available In Store : <span className="text-red-400">{obj.store_Volume} Unit</span></p>
                <p className="font-semibold text-xl roboto">Price : {obj.Price} <FaBangladeshiTakaSign className="inline-block"/></p>
                <div className=" flex justify-between yuji-mai-regular">
                    <button
                    // onClick={""} this button for add to cart
                    className="btn btn-primary">Add Card</button>
                    <button className="btn btn-outline dark:text-purple-600">Add favourites</button>
                </div>
            </div>
        </div>
    )
}
export default ProductCard