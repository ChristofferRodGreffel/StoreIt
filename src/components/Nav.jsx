import React from "react";
import { NavLink } from "react-router-dom";

export const Nav = () => {
  return (
    <nav>
      <NavLink to="/profile" activeclassname="active">
        <i className="fa-solid fa-user"></i>
        <p>Profile</p>
      </NavLink>
      <NavLink to="/storage" activeclassname="active">
        <i className="fa-solid fa-box-open"></i>
        <p>Storage</p>
      </NavLink>
      <NavLink to="/settings" activeclassname="active">
        <i className="fa-solid fa-gear"></i>
        <p>Settings</p>
      </NavLink>
    </nav>
  );
};
