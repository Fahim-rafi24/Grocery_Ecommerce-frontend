// router
import { Link, useNavigate } from "react-router-dom";
// icon
import { FaCartShopping } from "react-icons/fa6";
import heart from "../../../assets/Photo/heart.png"
import favourites from "../../../assets/Photo/favourites.png"
// utils
import { SideBar_Formating } from "./SideBar_Formating";
// context
import { useContext } from "react";
import { UserContext } from "../../../ContextStorage/UserContext";
import { AuthContext } from "../../../ContextStorage/FirebaseContext";
import Swal from "sweetalert2";



const Sidebar = () => {
    const { logOutVisible, user } = useContext(UserContext);
    const { logoutUser } = useContext(AuthContext);
    const navigate = useNavigate();

    // check can user is login
    const handleGoToCart = () => {
        if (user?.name && user?.email) {
            navigate("/cart")
        } else{
            // first give a alart
            Swal.fire({
                title: "Login First",
                text: "You won't be able to add item!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Login"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/login", {state:{from: "/cart" }})
                }
            });
            return
        }
    }

    return (
        <div className="drawer lg:drawer-open w-fit min-h-full z-50">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="flex flex-col min-h-full bg-gray-50 dark:bg-[#151414] p-4 rounded-r-lg font-semibold w-64 jaro">

                    {/* card path */}
                    <button onClick={handleGoToCart} className="btn rounded-lg bg-green-400 hover:bg-gray-50 font-extrabold text-black yuji-mai-regular mb-8">
                        <FaCartShopping className="h-9 text-2xl" />
                        Cart
                    </button>

                    {/* Popular & Favourites */}
                    <Link to={`/favourites`} className="flex flex-row my-2 hover:text-purple-500">
                        <img src={favourites} alt={'favourite'} className="h-6 w-6" />
                        <p className="ml-2">favourites</p>
                    </Link>
                    <Link to={`/popular`} className="flex flex-row my-2 hover:text-purple-500 mb-5">
                        <img src={heart} alt={'heart'} className="h-6 w-6" />
                        <p className="ml-2">Popular</p>
                    </Link>

                    {/* products path */}
                    <div className="flex-grow">
                        <SideBar_Formating></SideBar_Formating>
                    </div>

                    {logOutVisible && <button
                        onClick={() => logoutUser()}
                        className="btn rounded-lg text-white bg-purple-500 hover:bg-orange-400 font-thin my-5 px-6 dark:text-black dark:hover:bg-yellow-700 dark:bg-yellow-300 yuji-mai-regular">Log out</button>}

                    {/* white space */}
                    <div className="h-16"></div>
                </div>
            </div>
        </div>
    )
}
export default Sidebar