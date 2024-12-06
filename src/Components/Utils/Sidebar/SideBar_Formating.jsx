// json data
import sidebarData from "../../../../public/sidebar_root.json"
import { Link, NavLink } from "react-router-dom"



const SideBar_Formating = () => {

    // params maker info function
    const Catagory_params = (Industry, Catagory) => {
        const data = [Industry, Catagory];
        const res = JSON.stringify(data);
        // console.log(res);

        // Convert the object to URL parameters
        const queryString = new URLSearchParams(res).toString();

        return res
    };
    const SubCatagory_params = (Industry, Catagory, SubCatagory) => {
        const data = [Industry, Catagory, SubCatagory];
        const res = JSON.stringify(data);

        // Convert the object to URL parameters
        const queryString = new URLSearchParams(res).toString();

        return res
    };


    return (
        <>
            {
                !sidebarData ?
                    ""
                    :
                    // Industry list
                    sidebarData.map((Industry, inx) => <div key={inx}>
                        <NavLink to={`/Industry/${Industry?.Industry}`} className="flex flex-row my-2 hover:text-red-400">
                            <img src={Industry?.pic} alt={Industry?.Industry} className="h-5 w-5" />
                            <p>{Industry?.Industry.toUpperCase()}</p>
                        </NavLink>
                        {/* Catagory list*/}
                        {
                            <div className="border-l border-gray-500 dark:border-gray-600 font-normal ml-2">
                                {
                                    Industry?.All_Catagory.map((Catagory, inx) => <div key={inx}>
                                        <NavLink
                                            to={`/Catagory/${Catagory_params(Industry?.Industry, Catagory?.Catagory)}`}
                                            className="flex flex-row my-2 ml-2 hover:text-blue-400">
                                            {`${inx + 1}.`}
                                            <img src={Catagory?.pic} alt={Catagory?.Catagory} className="h-5 w-5 ml-2" />
                                            <p className="ml-2">{Catagory?.Catagory.toUpperCase()}</p>
                                        </NavLink>
                                        {/* SubCatagory list*/}
                                        <>
                                            <div className="border-l border-gray-500 dark:border-gray-600 ml-5">
                                                {
                                                    Catagory?.All_SubCatagory.map((SubCatagory, inx) => <div key={inx}>
                                                        <NavLink
                                                            to={`/SubCatagory/${SubCatagory_params(Industry?.Industry, Catagory?.Catagory, SubCatagory?.SubCatagory)}`}
                                                            className="flex flex-row my-2 ml-2 hover:text-green-400">
                                                            {/*  */}
                                                            <img src={SubCatagory?.pic} alt={SubCatagory?.SubCatagory} className="h-5 w-5" />
                                                            <p className="ml-2">{SubCatagory?.SubCatagory.toUpperCase()}</p>
                                                        </NavLink>
                                                    </div>)
                                                }
                                            </div>
                                        </>
                                    </div>)
                                }
                            </div>
                        }
                    </div>)
            }
        </>
    )
}
export { SideBar_Formating }