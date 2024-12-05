// react router
import { createBrowserRouter } from "react-router-dom";
// reguler file
import App from "../App";
import { Industry_Page } from "../Components/Pages/Industry/Industry_Page";
import { Catagory_Page } from "../Components/Pages/Catagory/Catagory_Page";
import { SubCatagory_Page } from "../Components/Pages/SubCatagory/SubCatagory_Page";



const Router = createBrowserRouter([
    {
      path: "/",
      element: <App></App>,
      errorElement: <div>Error Page</div>,
      children: [
        {
            path: '/',
            element: <div>Randome items show here</div>  // randome items show here
        },
        {
            path: '/cart',
            element: <div>cart</div>  // user add cart path
        },
        {
            path: '/popular',
            element: <div>popular</div>  // user add popular path
        },
        {
            path: '/favourites',
            element: <div>favourites</div>  // user add favourites path
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
        }
      ],
    },
    {
      path: "/second/hello",
      element: <div>Hello world!</div>,
    },
]);
export {Router};