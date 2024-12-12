// react router
import { createBrowserRouter } from "react-router-dom";
// reguler page file
import App from "../App";
import { Industry_Page } from "../Components/Pages/Industry/Industry_Page";
import { Catagory_Page } from "../Components/Pages/Catagory/Catagory_Page";
import { SubCatagory_Page } from "../Components/Pages/SubCatagory/SubCatagory_Page";
import { Home } from "../Components/Pages/Home/Home";
import { Cart } from "../Components/Pages/Cart/Cart";
import { Popular } from "../Components/Pages/Popular/popular";
import { Favourites } from "../Components/Pages/Favourites/Favourites";
import { Search } from "../Components/Pages/Search";
import Register from "../Components/Pages/Register/Register";
import Login from "../Components/Pages/Login/Login";
import { AdminHome } from "../Components/Pages/Admin/Home/AdminHome";
import { AddProduct } from "../Components/Pages/Admin/AddProduct/AddProduct";
import { AdminRootIdentification } from "../AdminRootIdentification/AdminRootIdentification";
import { UserRootIdentification } from "../PrivateRootIdentification/PrivateRootIdentification";

const Router = createBrowserRouter([
    {
      path: "/",
      element: <App></App>,
      children: [
        {
            path: '/',
            element: <Home></Home>  // randome items show here
        },
        {
            path: '/:random',
            element: <Home></Home>  // randome items show here
        },
        {
            path: '/search/:search',
            element: <Search></Search>  // randome items show here
        },
        {
            path: '/cart',
            element: <UserRootIdentification><Cart></Cart></UserRootIdentification>  // user add cart path
        },
        {
            path: '/favourites',
            element: <Favourites></Favourites>  // user add favourites path
        },
        {
            path: '/popular',
            element: <Popular></Popular>  // user add popular path
        },
        {
            path: '/Industry/:name',
            element: <Industry_Page></Industry_Page>
        },
        {
            path: '/Catagory/:Data',
            element: <Catagory_Page></Catagory_Page>
        },
        {
            path: '/SubCatagory/:Data',
            element: <SubCatagory_Page></SubCatagory_Page>
        },
        {
            path: '/login',
            element: <Login></Login>
        },
        {
            path: '/register',
            element: <Register></Register>
        }
      ],
    },
    {
        path : "/admin",
        element: <App></App>,
        children: [
            {
                path: '/admin',
                element: <AdminRootIdentification><AdminHome></AdminHome></AdminRootIdentification>
            },
            {
                path: '/admin/add_newProduct',
                element: <AdminRootIdentification><AddProduct></AddProduct></AdminRootIdentification>
            }
        ]
    }
]);
export {Router};