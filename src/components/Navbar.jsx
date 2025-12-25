import React from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../assets/DataVizLogo.png";
import { MdLightMode  } from "react-icons/md";

const Navbar = () => {
  return (
    <div>
      <nav className="flex justify-between  bg-white shadow-md mb-4">
        <div className="left flex">
          <img src={logo} alt="Logo" className="h-14" />
          <h1 className="text-xl font-bold text-gray-800 self-center ">
            DataViz Studio
          </h1>

          <ul className="flex self-center space-x-8 ml-10">
            <li className="">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "text-amber-500 border-b-2 border-amber-500" : "text-black"
                }
              >
                Builder
              </NavLink>
            </li>
            <li className="">
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive ? "text-amber-500 border-b-2 border-amber-500" : "text-black"
                }
              >
                Dashboard
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="right mr-4  self-center">
          <MdLightMode size={30} className="text-amber-500" />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
