import { HelmetFunc } from "../../Utils/Helmet/Helmet";
import { Link, useNavigate } from "react-router-dom";
// context
import { useContext } from "react";
import { UserContext } from "../../../ContextStorage/UserContext";
// alart
import Swal from "sweetalert2";



const Home = () => {
    // navigate
    const navigate = useNavigate();

    // user data context
    const { user } = useContext(UserContext);

    // admin page open func
    const adminHeandelFunc = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You Need To Open Admin Page!",
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then((result) => {
            if (result.isConfirmed) {
                // open admin page
                navigate('/admin')
                Swal.fire({
                    title: "Open Admin Page",
                    text: "",
                    icon: "success"
                });
            }
        });
    }

    return (
        <div className="w-full p-3">
            {/* helmet */}
            {HelmetFunc("Home")}
            <p className="yuji-mai-regular text-[14px] md:text-[16px]">home</p>
            {/* admin Root btn */}
            <div className="py-10">
                {
                    user?.isAdmin === true && <button
                        onClick={adminHeandelFunc}
                        className="btn text-xl font-bold rounded-lg px-10 bg-primary hover:text-white hover:bg-purple-400 dark:text-black dark:hover:bg-slate-50"
                    >Admin Page</button>
                }
            </div>

        </div>
    );
}
export { Home }