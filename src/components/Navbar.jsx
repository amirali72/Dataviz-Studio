import React from "react";
import { NavLink, Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav className="flex">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          DataViz Studio
        </h1>

        <ul className="nav-list">
          <li className="nav-item">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-amber-500" : "text-black"
              }
            >
              Builder
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? "text-amber-500" : "text-black"
              }
            >
              Dashboard
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
