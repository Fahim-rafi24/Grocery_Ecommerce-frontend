import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios_with_cookies from "../../../Axios/axios_with_cookies";
import Swal from "sweetalert2";
import { UserContext } from "../../../ContextStorage/UserContext";


const UserInfoUpdate = () => {
    const { userId } = useParams();
    const [fromUser, callUser] = useState(null);
    const {setUser} = useContext(UserContext)
    const navigate = useNavigate();

    const location = useLocation();
    const from = location?.state?.from || "/";

    useEffect(() => {
        // call total cost api
        const fetchProducts = async () => {
            try {
                const response = await axios_with_cookies.post(`/UserInfo`, { id: userId, obj: {} });
                callUser(response.data.data);  // i know this api not importent . Because this user info all ready exist in user Context
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        // call this async function
        fetchProducts();
    }, [userId])

    const infoUpdateHandle = (e) => {
        e.preventDefault();
        const form = e.target;
        const Mobile_NO = form.Mobile_NO.value;
        const Emerangcy_number = form.Emerangcy_number.value;
        const DOB = form.DOB.value;
        const Maritial_status = form.Maritial_status.value;
        const Gender = form.Gender.value;
        const Ocopation = form.Ocopation.value;
        const Montly_income = form.Montly_income.value;
        const Permanent_location = form.Permanent_location.value;
        const Current_location = form.Current_location.value;
        if (Mobile_NO.toString().length !== 11 || Emerangcy_number.toString().length !== 11) {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Give Valid Number",
                showConfirmButton: false,
                timer: 3500
            });
            return
        } else {
            const obj = { Mobile_NO, Emerangcy_number, DOB, Maritial_status, Gender, Ocopation, Montly_income, Permanent_location, Current_location };
            const callObj = { id: fromUser?._id, obj };
            const fetchInfoCall = async () => {
                try {
                    const response = await axios_with_cookies.post("/UpdateUserInfo", callObj)
                    setUser(response.data.data);
                    callUser(response.data.data);
                    form.reset();
                    navigate(from);
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `User info Updated`,
                        showConfirmButton: false,
                        timer: 2000
                      });
                } catch (error) {
                    console.log("Error happend", error);
                }
            }
            fetchInfoCall();
        }
    }

    return (
        <div className="w-full p-2">
            <form
                onSubmit={infoUpdateHandle}
                className="md:m-10 md:p-10 rounded-lg bg-gray-300 dark:bg-purple-300 text-black text-xl grid gap-2 md:gap-5 py-5 md:grid-cols-2 xl:grid-cols-3 shadow-2xl">
                {/* name */}
                <div className="flex flex-col px-3 md:px-0 xl:col-span-3">
                    <label className="mb-2 ml-2">Name :</label>
                    <input type="text" name="name" className="pl-3 dark:text-white py-2 rounded-lg" defaultValue={fromUser?.name} disabled />
                </div>
                {/* email */}
                <div className="flex flex-col px-3 md:px-0">
                    <label className="mb-2 ml-2">Email :</label>
                    <input type="text" name="email" className="pl-3 dark:text-white py-2 rounded-lg" defaultValue={fromUser?.email} disabled />
                </div>
                {/* password */}
                <div className="flex flex-col px-3 md:px-0">
                    <label className="mb-2 ml-2">Password :</label>
                    <input type="text" name="password" className="pl-3 dark:text-white py-2 rounded-lg" defaultValue={`************`} disabled />
                </div>
                {/* modile */}
                <div className="flex flex-col px-3 md:px-0">
                    <label className="mb-2 ml-2">Mobile number :</label>
                    <input type="number" name="Mobile_NO" className="pl-3 dark:text-white py-2 rounded-lg" placeholder="Number" defaultValue={fromUser?.Mobile_NO} required />
                </div>
                {/* second mobile */}
                <div className="flex flex-col px-3 md:px-0">
                    <label className="mb-2 ml-2">Emerangcy mobile number :</label>
                    <input type="number" name="Emerangcy_number" className="pl-3 dark:text-white py-2 rounded-lg" placeholder="Number" defaultValue={fromUser?.Emerangcy_number} required />
                </div>
                {/* DOB */}
                <div className="flex flex-col px-3 md:px-0">
                    <label className="mb-2 ml-2">Date of birth :</label>
                    <input type="date" name="DOB" className="pl-3 dark:text-white py-2 rounded-lg" defaultValue={fromUser?.DOB} required />
                </div>
                {/* Is Married */}
                <div className="flex flex-col px-3 md:px-0">
                    <label className="mb-2 ml-2">Maritial status :</label>
                    <select name="Maritial_status" className="pl-3 dark:text-white py-2 rounded-lg" defaultValue={fromUser?.Maritial_status} required>
                        <option value="Married">Married</option>
                        <option value="Single">Single</option>
                    </select>
                </div>
                {/* Gender */}
                <div className="flex flex-col px-3 md:px-0">
                    <label className="mb-2 ml-2">Gender :</label>
                    <select name="Gender" className="pl-3 dark:text-white py-2 rounded-lg" defaultValue={fromUser?.Gender} required>
                        <option value="Man">Man</option>
                        <option value="Woman">Woman</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                {/* Ocopation */}
                <div className="flex flex-col px-3 md:px-0">
                    <label className="mb-2 ml-2">Ocopation :</label>
                    <select name="Ocopation" className="pl-3 dark:text-white py-2 rounded-lg" defaultValue={fromUser?.Ocopation}>
                        <option value="Office Employee">Office Employee</option>
                        <option value="Business Man">Business Man</option>
                        <option value="House Wife">House Wife</option>
                        <option value="Student">Student</option>
                    </select>
                </div>
                {/* Montly_income */}
                <div className="flex flex-col px-3 md:px-0">
                    <label className="mb-2 ml-2">Montly income :</label>
                    <select name="Montly_income" className="pl-3 dark:text-white py-2 rounded-lg" defaultValue={fromUser?.Montly_income}>
                        <option value="0-10000">0-10000</option>
                        <option value="10000-20000">10000-20000</option>
                        <option value="20000-40000">20000-40000</option>
                        <option value="40000-100000">40000-100000</option>
                    </select>
                </div>
                {/* Permanent_location */}
                <div className="flex flex-col px-3 md:px-0 md:col-span-2 xl:col-span-3">
                    <label className="mb-2 ml-2">Permanent location :</label>
                    <input type="text" name="Permanent_location" className="pl-3 dark:text-white py-2 rounded-lg" placeholder="Area"
                        defaultValue={fromUser?.Permanent_location} />
                </div>
                {/* current_location */}
                <div className="flex flex-col px-3 md:px-0 md:col-span-2 xl:col-span-3">
                    <label className="mb-2 ml-2">Current location :</label>
                    <input type="text" name="Current_location" className="pl-3 dark:text-white py-2 rounded-lg" placeholder="Area"
                        defaultValue={fromUser?.Current_location} />
                </div>
                {/* submit button */}
                <div className="px-3 md:px-0 mt-5 xl:text-center xl:col-span-3">
                    <button className="btn btn-outline text-black rounded-lg px-12" type="submit">INFO UPDATE</button>
                </div>
            </form>
        </div>
    )
}
export default UserInfoUpdate