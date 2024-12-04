// react 
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// react router
import { RouterProvider } from "react-router-dom";
import { Router } from './Router/router.jsx';
// css file
import './index.css'
// context provider
import ThemeProvider from './ContextStorage/ThemeContext.jsx';
import UserProvider from './ContextStorage/UserContext.jsx';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>  {/* User Data provider */}
    <ThemeProvider>  {/* Theme provider */}
    <RouterProvider router={Router} /> {/* react router provider */}
    </ThemeProvider>
    </UserProvider>
  </StrictMode>,
)