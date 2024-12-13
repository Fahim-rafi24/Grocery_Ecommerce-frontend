import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react"
import { UserContext } from "../../../../ContextStorage/UserContext";
import axios_with_cookies from "../../../../Axios/axios_with_cookies";
import Swal from "sweetalert2";


const UserList = () => {
    const [userList, setUserList] = useState(null);
    const { user } = useContext(UserContext);
    // console.log(userList);
    useEffect(() => {
        if (!userList) {
            const id = user?._id;
            const callAPI = async () => {
                const responce = await axios_with_cookies.post("/allUserList", { id, obj: { createdAt: 1 } })
                setUserList(responce?.data?.data);
            };
            callAPI();
        }
    }, []);
    // 
    const handleFormData = (obj) => {
        const id = user?._id;
        const callAPI = async () => {
            const responce = await axios_with_cookies.post("/allUserList", { id, obj });
            setUserList(responce?.data?.data);
        };
        callAPI();
    }

    // add a addmin
    const makeAdminHandle = (targetedId, name) => {
        Swal.fire({
            title: "Are you sure?",
            html: `<p>You Add <strong>${name}</strong> As A Admin</p>`,
            icon: "question",
            confirmButtonColor: "#5DB996",
            confirmButtonText: "Yes, Do It!"
        }).then((result) => {
            if (result.isConfirmed) {
                // call admin maker api
                const obj = { targetedId };
                const callAPI = async () => {
                    const responce = await axios_with_cookies.post("/makeAdmin", { id: user?._id, obj });
                    if (responce?.data?.data.makeAdmin) {
                        const id = user?._id;
                        const callAPI = async () => {
                            const responce = await axios_with_cookies.post("/allUserList", { id, obj: { createdAt: 1 } })
                            setUserList(responce?.data?.data);
                        };
                        callAPI();
                        Swal.fire(`${name} add as a admin`);
                    }
                };
                callAPI();
            }
        });
    };

    // manage all data
    const allDataMannage = (value) => {
        const isTrue = value;
        return isTrue ? value : <span className="text-red-600">Not Added</span>;
    };

    // table data class
    const tdClass = "bg-gray-200 border border-black dark:text-black text-center";

    return (
        <div className="w-full p-3 md:p-10">
            <section className="my-10 flex flex-col md:flex-row md:justify-evenly">
                <button
                    onClick={() => handleFormData({ createdAt: 1 })}
                    className="btn my-3 text-xl font-bold dark:text-black dark:hover:text-white bg-[#E3F0AF]">NEW TO OLD USER</button>
                <button
                    onClick={() => handleFormData({ createdAt: -1 })}
                    className="btn my-3 text-xl font-bold dark:text-black dark:hover:text-white bg-purple-500">OLD TO NEW USER</button>
            </section>
            <div className="overflow-x-auto">
                <table className="table table-xs">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>User ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Gender</th>
                            <th>Mobile</th>
                            <th>Second Mobile</th>
                            <th>Montly Income</th>
                            <th>Location</th>
                            <th>Secondary Location</th>
                            <th>DOB</th>
                            <th>Is Married</th>
                            <th>Profetion</th>
                            <th>Account Created Date</th>
                            <th>Account Last Update Date</th>
                            <th>Make User As Admin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            !userList || userList.map((each, inx) => <tr key={inx}>
                                <th className={tdClass}>{inx + 1}</th>
                                <td className={`${tdClass} font-bold`}>{each?._id}</td>
                                <td className={` ${tdClass}`}>{each?.name}</td>
                                <td className={` ${tdClass}`}>{each?.email}</td>
                                <td className={` ${tdClass}`}>{allDataMannage(each?.Gender)}</td>
                                <td className={` ${tdClass}`}>{allDataMannage(each?.Mobile_NO)}</td>
                                <td className={` ${tdClass}`}>{allDataMannage(each?.Emerangcy_number)}</td>
                                <td className={` ${tdClass}`}>{allDataMannage(each?.Montly_income)}</td>
                                <td className={` ${tdClass}`}>{allDataMannage(each?.Current_location)}</td>
                                <td className={` ${tdClass}`}>{allDataMannage(each?.Permanent_location)}</td>
                                <td className={` ${tdClass}`}>{allDataMannage(each?.DOB)}</td>
                                <td className={` ${tdClass}`}>{allDataMannage(each?.Maritial_status)}</td>
                                <td className={` ${tdClass}`}>{allDataMannage(each?.Ocopation)}</td>
                                <td className={` ${tdClass}`}>{allDataMannage(each?.createdAt)}</td>
                                <td className={` ${tdClass}`}>{allDataMannage(each?.updatedAt)}</td>
                                {/* add admin button */}
                                <td className={`${tdClass}`}>
                                    {
                                        each?.isAdmin ? "Admin" : <button
                                            onClick={() => makeAdminHandle(each?._id, each?.name)}
                                            className="btn-link text-blue-500">Make Admin</button>
                                    }
                                </td>
                            </tr>)
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>No.</th>
                            <th>User ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Gender</th>
                            <th>Mobile</th>
                            <th>Second Mobile</th>
                            <th>Montly Income</th>
                            <th>Location</th>
                            <th>Secondary Location</th>
                            <th>DOB</th>
                            <th>Is Married</th>
                            <th>Profetion</th>
                            <th>Account Created Date</th>
                            <th>Account Last Update Date</th>
                            <th>Make Admin Button</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    )
}
export default UserList