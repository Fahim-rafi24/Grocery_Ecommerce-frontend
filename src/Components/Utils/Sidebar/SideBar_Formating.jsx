// json data
import sidebarData from "../../../../public/sidebar_root.json"
import { Link } from "react-router-dom"



const SideBar_Formating = () => {
    return (
        <>
            {
                !sidebarData ?
                    ""
                    :
                    // Industry list
                    sidebarData.map((each, inx) => <div key={inx}>
                        <Link to={`/Industry/${each?.Industry}`} className="flex flex-row my-2">
                            <img src={each?.pic} alt={each?.Industry} className="h-5 w-5" />
                            <p>{each?.Industry}</p>
                        </Link>
                        {/* Catagory list*/}
                        {
                            <div className="border-l border-gray-500 dark:border-gray-600 ml-2">
                                {
                                    each?.All_Catagory.map((each, inx) => <div key={inx}>
                                        <Link to={`/Catagory/${each?.Catagory}`} className="flex flex-row my-2 ml-2">
                                            {`${inx + 1}.`}
                                            <img src={each?.pic} alt={each?.Catagory} className="h-5 w-5 ml-2"/>
                                            <p className="ml-2">{each?.Catagory}</p>
                                        </Link>
                                        {/* SubCatagory list*/}
                                        <>
                                            <div className="border-l border-gray-500 dark:border-gray-600 ml-5">
                                                {
                                                    each?.All_SubCatagory.map((each, inx) => <div key={inx}>
                                                        <Link to={`/SubCatagory/${each?.SubCatagory}`} className="flex flex-row my-2 ml-2">
                                                            <img src={each?.pic} alt={each?.SubCatagory} className="h-5 w-5" />
                                                            <p className="ml-2">{each?.SubCatagory}</p>
                                                        </Link>
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