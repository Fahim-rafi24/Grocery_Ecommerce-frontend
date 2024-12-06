import { useState } from "react";
// json data
import sidebarData from "../../../../public/sidebar_root.json"
import { NavLink } from "react-router-dom"

const SideBar_Formating = () => {
    const [openIndustry, setOpenIndustry] = useState(null); // Tracks which Industry is open
    const [openCategory, setOpenCategory] = useState({}); // Tracks open Categories for each Industry

    // Toggle Industry
    const toggleIndustry = (index) => {
        setOpenIndustry(openIndustry === index ? null : index);
    };

    // Toggle Category
    const toggleCategory = (industryIndex, categoryIndex) => {
        setOpenCategory((prevState) => ({
            ...prevState,
            [industryIndex]: prevState[industryIndex] === categoryIndex ? null : categoryIndex,
        }));
    };

    // params maker info function
    const Catagory_params = (Industry, Catagory) => {
        const data = [Industry, Catagory];
        const res = JSON.stringify(data);

        return res
    };
    const SubCatagory_params = (Industry, Catagory, SubCatagory) => {
        const data = [Industry, Catagory, SubCatagory];
        const res = JSON.stringify(data);

        return res
    };

    // handle button one of

    return (
        <>
            {
                !sidebarData ?
                    ""
                    :
                    // Industry list
                    sidebarData.map((Industry, industryIndex) => <div key={industryIndex}>
                        <NavLink
                            to={`/Industry/${Industry?.Industry}`}
                            className="flex flex-row my-2 hover:text-red-400"
                            onClick={() => toggleIndustry(industryIndex)}>
                            <img src={Industry?.pic} alt={Industry?.Industry} className="h-5 w-5" />
                            <p>{Industry?.Industry.toUpperCase()}</p>
                        </NavLink>
                        {/* Catagory list*/}
                        {
                            <div className="border-l border-gray-500 dark:border-gray-600 font-normal ml-2">
                                {openIndustry === industryIndex && (<>
                                    {
                                        Industry?.All_Catagory.map((Catagory, categoryIndex) => <div key={categoryIndex}>
                                            <NavLink
                                                to={`/Catagory/${Catagory_params(Industry?.Industry, Catagory?.Catagory)}`}
                                                className="flex flex-row my-2 ml-2 hover:text-blue-400"
                                                onClick={() => toggleCategory(industryIndex, categoryIndex)}>
                                                {`${categoryIndex + 1}.`}
                                                <img src={Catagory?.pic} alt={Catagory?.Catagory} className="h-5 w-5 ml-2" />
                                                <p className="ml-2">{Catagory?.Catagory.toUpperCase()}</p>
                                            </NavLink>
                                            {/* SubCatagory list*/}
                                            {openCategory[industryIndex] === categoryIndex && (<>
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
                                            </>)}
                                        </div>)
                                    }
                                </>)}
                            </div>
                        }
                    </div>)
            }
        </>
    )
}
export { SideBar_Formating }