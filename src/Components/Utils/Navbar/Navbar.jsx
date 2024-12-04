import { useContext, useEffect, useState } from "react";
// ContextStorage
import { ThemeContext } from "../../../ContextStorage/ThemeContext";
import { UserContext } from "../../../ContextStorage/UserContext";
// picture
import lightLogo from "../../../assets/Photo/light_logo.jpeg";
import darkLogo from "../../../assets/Photo/dark_logo.jpg";
import { FaUserCircle } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { IoReorderThreeSharp } from "react-icons/io5";



const NavBar = () => {
  // call Theme from ThemeContext.jsx
  const { theme, setTheme, toggleDarkMode } = useContext(ThemeContext);
  // call user from UserContext.jsx
  const { user } = useContext(UserContext);

  // them effect
  useEffect(() => {
    if (theme === 'dark') {
      toggleDarkMode(false)
    }
    else {
      toggleDarkMode(true)
    }
    document.querySelector('html').setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme); // Save the preference in localStorage
  }, [theme]);

  // Handler for the checkbox toggle
  const handleToggle = () => {
    setTheme(theme === 'cupcake' ? 'dark' : 'cupcake');
  };

  // navbarSearch
  const navbarSearch = (
    <>
      <input type="text" className={`w-full h-full font-bold rounded-full pl-7 ${theme === "dark" ? '' : 'border-2 border-black'}`} />
    </>
  );



  return (
    <div className="flex justify-between p-6 h-24">
      {/* logo section */}
      <div className="flex flex-row">
        {/* SideBar call 3dot */}
        <label htmlFor="my-drawer-2" className="lg:hidden">
          <IoReorderThreeSharp className="text-4xl h-full mr-2"/>
        </label>
        {
          theme === "dark" ?
            <img src={darkLogo} alt="Main Logo" className="btn p-0 m-0" />
            :
            <img src={lightLogo} alt="Main Logo" className="btn p-0 m-0 border-none rounded-md shadow-md" />
        }
      </div>
      {/* search section for Tab or learge device */}
      <div className="hidden md:block md:w-3/6">
        {navbarSearch}
      </div>

      {/* end info */}
      <section className="w-2/5 md:w-1/5 flex justify-between">

        {/* user Login Status */}
        <div>
          {
            !user ?
              <button
                className="btn border rounded-lg text-lg font-bold bg-purple-500 dark:bg-gray-400 dark:text-purple-700"
              >
                Login
              </button>
              :
              <>
                {
                  user?.avater ?
                    // if truthy
                    <div className="flex flex-row">
                      <img src={user.avater} alt="user Avater" className="h-12 w-12 rounded-full" />
                      <div className="ml-2 hidden xl:block">
                        <h2 className="font-bold text-xl">{user?.name}</h2>
                        <h6 className="text-purple-500 dark:text-sky-500 font-semibold">{user?.email}</h6>
                      </div>
                    </div>
                    :
                    // if falsy
                    <>
                      {
                        theme === "dark" ?
                          <FaUserCircle className="h-full text-4xl" />
                          :
                          <FaRegUserCircle className="h-full text-4xl" />
                      }
                    </>
                }
              </>
          }
        </div>
        {/* user Login Status End */}

        {/* them btn */}
        <div>
          {/* them btn */}
          <label className="h-full swap swap-rotate">
            {/* this hidden checkbox controls the state */}
            <input
              type="checkbox"
              checked={theme === 'dark' ? false : true}
              onChange={handleToggle}
            />
            {/* sun icon */}
            <svg
              className="swap-on h-10 w-10 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24">
              <path
                d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>
            {/* moon icon */}
            <svg
              className="swap-off h-10 w-10 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24">
              <path
                d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>
        </div>
        {/* them btn End */}
      </section>
    </div>
  )
};
export default NavBar