import React from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../assets/DataVizLogo.png";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { useDarkMode } from "../hooks/useDarkMode";

const Navbar = () => {
  const { theme, toggleTheme } = useDarkMode();
  return (
    <div >
      <nav className="flex justify-between shadow-md mb-4 bg-white dark:bg-gray-800">
        <div className="left flex">
          <NavLink to="/" className="flex">
            <img src={logo} alt="Logo" className="h-14" />
            <h1 className="text-xl font-bold text-gray-800 dark:text-white self-center">
              DataViz Studio
            </h1>
          </NavLink>

          <ul className="flex self-center space-x-8 ml-10">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-amber-500 border-b-2 border-amber-500"
                    : "text-gray-800 dark:text-gray-200"  // ← Changed here!
                }
              >
                Builder
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive
                    ? "text-amber-500 border-b-2 border-amber-500"
                    : "text-gray-800 dark:text-gray-200"  // ← Changed here!
                }
              >
                Dashboard
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="right mr-4 self-center">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {theme === "light" ? (
              <MdDarkMode size={30} className="text-gray-700 dark:text-gray-300" />
            ) : (
              <MdLightMode size={30} className="text-amber-500" />
            )}
          </button>
        </div>
      </nav>
    </div>
  );
};


export default Navbar;
