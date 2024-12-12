import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios_with_cookies from "../../../Axios/axios_with_cookies";
import Swal from "sweetalert2";
import { useContext } from "react";
import { ItemContext } from "../../../ContextStorage/ItemContext";

const PaymentPage = () => {
    const { userId } = useParams();  // here userId help to find the user
    const location = useLocation();
    const totalCost = location.state?.totalCost;  // this defind total pay amount in number type
    const Cart = JSON.parse(localStorage.getItem("Cart"));
    const navigate = useNavigate();
    const { setCarts } = useContext(ItemContext);

    // do Payment
    const handlePayment = () => {
        const fetchProducts = async () => {
            try {
                const obj = {
                    totalCost, Cart
                };
                const response = await axios_with_cookies.post(`/Pay_add_product`, { id: userId, obj });
                if (response?.data?.data) {
                    localStorage.removeItem("Cart");
                    setCarts([]);
                    navigate("/");
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your Order Is Confirm",
                        showConfirmButton: false,
                        timer: 2500
                    });
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }

    if (!userId) {
        return <div className="w-[100vw] h-[100vh] grid justify-center items-center text-5xl text-red-600">Try again</div>
    } else if (!totalCost) {
        return <div className="w-[100vw] h-[100vh] grid justify-center items-center text-5xl text-red-600">Some thing may worng</div>
    } else if (!Cart) {
        return <div className="w-[100vw] h-[100vh] grid justify-center items-center text-5xl text-red-600">Try again</div>
    }

    return (
        <div className="text-center mt-40">
            <h2 className="text-2xl">payment Page</h2>
            <button onClick={handlePayment} className="btn rounded-md mt-3">PAY</button>
        </div>
    )
}
export default PaymentPage