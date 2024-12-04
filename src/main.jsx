// react 
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// react router
import { RouterProvider } from "react-router-dom";
import { Router } from './Router/router.jsx';
// css file
import './index.css'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={Router} /> {/* react router provider */}
  </StrictMode>,
)