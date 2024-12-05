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
            element: <Cart></Cart>  // user add cart path
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
            element: <div>login</div>
        },
        {
            path: '/register',
            element: <div>register</div>
        }
      ],
    },
    {
        path : "/admin",
        element: <App></App>,
        children: [
            {
                path: '/admin',
                element: <>hi admin</>
            }
        ]
    }
]);
export {Router};