import { FaBangladeshiTakaSign } from "react-icons/fa6";

const ProductCard = (obj) => {
    return (
        <div className="card bg-base-100 shadow-2xl jaro">
            <figure>
                <img
                    src={obj.img}
                    alt={obj._id} />
            </figure>
            <div className="card-body text-center">
                <h2 className="font-light text-2xl yuji-mai-regular">{obj.name}</h2>
                <p className="text-[20px]   ">Unit : {obj.product_Volume}</p>
                <p className="text-[20px]">Available In Store : {obj.store_Volume} Unit</p>
                <p className="font-semibold text-xl roboto">Price : {obj.Price} <FaBangladeshiTakaSign className="inline-block"/></p>
                <div className="card-actions justify-start yuji-mai-regular">
                    <button
                    onClick={""}
                    className="btn btn-primary">Add to Card</button>
                </div>
            </div>
        </div>
    )
}
export default ProductCard