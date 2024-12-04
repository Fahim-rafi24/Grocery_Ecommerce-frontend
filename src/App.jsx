import { Outlet } from "react-router-dom"
import NaveBar from "./Components/Utils/Navbar/Navbar.jsx"





const App = () =>{
  return(
    <>
    {/* nave bar */}
    <NaveBar></NaveBar>
    
    {/* sidebar */}

    {/* Nested Routes */}
    <Outlet></Outlet>
    </>
  )
}

export default App