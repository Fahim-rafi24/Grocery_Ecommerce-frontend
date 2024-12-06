import { Link } from "react-router-dom"
import { HelmetFunc } from "../../../Utils/Helmet/Helmet"



const AdminHome = () => {
    return (
        <div className="w-full p-3">
            {/* helmet */}
            {HelmetFunc("Admin Home")}
            <Link className="yuji-mai-regular text-[14px] md:text-[16px]">Admin Home</Link>
            {/* Add New Product */}
            <section className="flex justify-center">
                <Link
                to={"/admin/add_newProduct"}
                className="flex justify-center items-center border-2 dark:border-white border-black border-dotted dark:border-double min-h-56 mt-32 z-0 w-4/6">
                <button className="btn rounded-none bg-green-400 dark:bg-amber-200 dark:hover:bg-gray-300 dark:text-blue-500 text-xl">+ add New Product</button>
                </Link>
            </section>
        </div>
    )
}
export { AdminHome }