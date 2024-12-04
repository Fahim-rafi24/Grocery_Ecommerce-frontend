import { createContext, useEffect, useState } from "react";



// Create the ThemeContext
export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
    // State to manage the theme for Device them detected
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'cupcake');  // Default to 'cupcake'


    // Toggle dark mode on or off for react className
    const [isDarkMode, setIsDarkMode] = useState(false);
    // 
    const toggleDarkMode = (value) => {
        setIsDarkMode(value);
    };

    // Apply the dark class to the <html> element
    useEffect(() => {
        if (!isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme, toggleDarkMode }}>
            {/* provide theme & set Theme */}
            {children}
        </ThemeContext.Provider>
    );
};


export default ThemeProvider;