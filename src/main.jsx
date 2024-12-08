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
import FirebaseContext from './ContextStorage/FirebaseContext.jsx';
import ItemProvider from './ContextStorage/ItemContext.jsx';
// 



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FirebaseContext>  {/* Auth Data provider */}
      <UserProvider>  {/* User Data provider */}
        <ThemeProvider>  {/* Theme provider */}
          <ItemProvider>  {/* Product manage provider */}
            <RouterProvider router={Router} /> {/* react router provider */}
          </ItemProvider>
        </ThemeProvider>
      </UserProvider>
    </FirebaseContext>
  </StrictMode>,
)