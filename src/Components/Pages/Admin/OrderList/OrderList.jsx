import { useContext, useEffect } from "react";
import { useState } from "react"
import axios_with_cookies from "../../../../Axios/axios_with_cookies";
import { UserContext } from "../../../../ContextStorage/UserContext";
import Swal from "sweetalert2";



const OrderList = () => {
    const { user } = useContext(UserContext);
    const [orders, setOrders] = useState([]);
    const [searchValue, setSearchValue] = useState('Pending');

    useEffect(() => {
        const callAPI = async () => {
            const response = await axios_with_cookies.post("/Order_admin_status", { id: user?._id, obj: { searchValue } })
            setOrders(response.data.data);
        }
        callAPI();
    }, [searchValue])

    // order_status changing button func
    const handleChangedOrderStatus = (_id, state) => {  // this _id defind order _id & state defind order_status
        if (!_id) {
            Swal.fire({
                title: "Try Again ..."
            })
            return
        }
        Swal.fire({
            title: "Are you sure?",
            text: `You ${state} this Order!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                const callAPI = async () => {
                    const response = await axios_with_cookies.post("/OrderStatusChanged", { id: user._id, obj: { state, _id } })
                    if (response.data.data.status === "success") {
                        Swal.fire({
                            title: `${state} Complete..`
                        })
                        const callAPI2 = async () => {  // recall api
                            const response = await axios_with_cookies.post("/Order_admin_status", { id: user?._id, obj: { searchValue } })
                            setOrders(response.data.data);
                        }
                        callAPI2();
                    }
                }
                callAPI();
            }
        });
    }

    // user info alart func
    const userInfoHandle = (info) => {
        Swal.fire({
            title: `${info._id}`,
            html: `
        <div class="text-start">
        <p class="my-2"><strong>Name:</strong> ${info.name}</p>
        <p class="my-2"><strong>Email:</strong> ${info.email}</p>
        <p class="my-2"><strong>Mobile:</strong> ${info.Mobile_NO}</p>
        <p class="my-2"><strong>Extra-Mobile:</strong> ${info.Emerangcy_number}</p>
        <p class="my-2"><strong>Gender:</strong> ${info.Gender}</p>
        <p class="my-2"><strong>Current Location:</strong> ${info.Current_location}</p>
        <p class="my-2"><strong>Permanent Location:</strong> ${info.Permanent_location}</p>
        </div>
    `,
        });
    };
    // order type call func
    const handleOrderBtn = (name) => {
        setSearchValue(name);
    };

    return (
        <div className="w-full">
            <div className="mx-5 mt-10 flex flex-col md:flex-row justify-between gap-5">
                <button
                    onClick={() => handleOrderBtn("Pending")}
                    className="btn px-9 bg-yellow-400 dark:text-black">Pending Order</button>
                <button
                    onClick={() => handleOrderBtn("Delivery")}
                    className="btn px-9 bg-green-500 dark:text-black">Delivery Order</button>
                <button
                    onClick={() => handleOrderBtn("Cancel")}
                    className="btn px-9 bg-red-500 dark:text-black">Cancel Order</button>
            </div>
            {/* display old order list */}
            <section>
                <p className="text-center my-10 text-3xl">{orders.length}</p>
                {
                    orders ? <div className="px-5">
                        {
                            orders.map((eachOrder, inx) => (<div key={inx}>
                                {/* top section */}
                                <div className={`border-t dark:border-none text-center md:text-start p-5 shadow-2xl my-10 ${eachOrder?.order_status === "Delivery" ? "bg-green-400 dark:text-black" : ""}   ${eachOrder?.order_status === "Cancel" ? "bg-red-400 dark:text-black" : ""}`}>
                                    <div className="md:flex justify-between">
                                        <p className="text-2xl font-semibold">Total Pay : {eachOrder?.payAmount}</p>
                                        <p>Order Status : <span className="font-bold">{eachOrder?.order_status}</span></p>
                                    </div>
                                    <div className="md:flex justify-between pb-4 border-b mt-3">
                                        <p>User Name : {eachOrder?.userDetails?.name}</p>
                                        <p>User Email : {eachOrder?.userDetails?.email}</p>
                                    </div>
                                    {
                                        eachOrder?.order_products.map((order_products, inx) => <div key={inx} className="flex justify-between my-4">
                                            <img src={order_products.product.img} alt="" className="h-20" />
                                            <div className="text-end">
                                                <p>Each Item Name : {order_products?.product?.name}</p>
                                                <p>Each Item Price : {order_products?.price}</p>
                                                <p>Total Item Quantity : {order_products?.quantity}</p>
                                            </div>
                                        </div>)
                                    }
                                    <p className="text-center text-orange-900">order Id : - {eachOrder?._id}</p>
                                    <div className="text-end my-5 md:mr-10">
                                        <button onClick={() => userInfoHandle(eachOrder?.userDetails)} className="btn rounded-xl bg-amber-300 dark:text-black">User Info</button>
                                    </div>
                                    <div className="md:flex justify-between">
                                        <p className="text-green-900">Create Date : {eachOrder?.createdAt}</p>
                                        <p className="text-purple-900">Update Date : {eachOrder?.updatedAt}</p>
                                    </div>
                                    <div className={`flex justify-evenly ${eachOrder?.order_status === "Pending" || "hidden"}`}>
                                        <button onClick={() => handleChangedOrderStatus(eachOrder?._id, "Delivery")} className="btn rounded-xl bg-green-500 dark:text-black">Order Complete</button>
                                        <button onClick={() => handleChangedOrderStatus(eachOrder?._id, "Cancel")} className="btn rounded-xl bg-red-600 dark:text-black">Order Cancel</button>
                                    </div>
                                </div>
                            </div>))
                        }
                    </div> : ""
                }
            </section>
        </div>
    )
}

export default OrderList