import { SideBar_Formating } from "./SideBar_Formating";



const Sidebar = () => {
    return (
        <div className="drawer lg:drawer-open w-fit min-h-full">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="bg-gray-50 dark:bg-[#151414] min-h-full p-4 rounded-r-lg font-semibold w-64">
                    <SideBar_Formating></SideBar_Formating>
                </ul>
            </div>
        </div>
    )
}
export default Sidebar