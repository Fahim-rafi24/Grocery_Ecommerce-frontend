// react router
import { createBrowserRouter } from "react-router-dom";
// reguler file
import App from "../App";



const Router = createBrowserRouter([
    {
      path: "/",
      element: <App></App>,
      errorElement: <div>Error Page</div>,
      children: [
        {
            path: '/',
            element: <div>Hello world ?</div>
        }
      ],
    },
    {
      path: "/second/hello",
      element: <div>Hello world!</div>,
    },
]);
export {Router};