// router
import { Link } from "react-router-dom";
// icon
import { FaCartShopping } from "react-icons/fa6";
// utils
import { SideBar_Formating } from "./SideBar_Formating";


const Sidebar = () => {
    return (
        <div className="drawer lg:drawer-open w-fit min-h-full">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="bg-gray-50 dark:bg-[#151414] min-h-full p-4 rounded-r-lg font-semibold w-64 jaro">
                    {/* card path */}
                    <Link to={'/cart'} className="btn rounded-2xl bg-green-400 hover:bg-gray-50 font-extrabold text-black yuji-mai-regular mb-8">
                        <FaCartShopping className="h-9 text-2xl"/>
                        Cart
                    </Link>
                    {/* products path */}
                    <SideBar_Formating></SideBar_Formating>
                </div>
            </div>
        </div>
    )
}
export default Sidebar