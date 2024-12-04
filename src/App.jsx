import { Outlet } from "react-router-dom"
import NavBar from "./Components/Utils/Navbar/Navbar.jsx"
import Sidebar from "./Components/Utils/Sidebar/Sidebar.jsx"





const App = () => {
  return (
    <>
      {/* nave bar */}
      <NavBar></NavBar>
      <div className="lg:mt-0 flex flex-row">
        {/* sidebar */}
        <Sidebar></Sidebar>
        {/* Nested Routes */}
        <Outlet></Outlet>
      </div>
    </>
  )
}

export default App