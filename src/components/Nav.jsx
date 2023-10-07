import React from "react";
import { Link } from "react-router-dom";

export const Nav = () => {
  return (
    <nav>
      <Link to="/profile">
        <i className="fa-solid fa-user"></i>
        <p>Profile</p>
      </Link>
      <Link to="/storage">
        <i className="fa-solid fa-box-open"></i>
        <p>Storage</p>
      </Link>
      <Link to="/settings">
        <i className="fa-solid fa-gear"></i>
        <p>Settings</p>
      </Link>
    </nav>
  );
};
