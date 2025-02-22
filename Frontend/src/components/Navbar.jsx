import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../logo.png";
import { useSelector } from "react-redux";

const Navbar = () => {
  
  const { user } = useSelector((state) => state.auth);


  return (
    <div>
      <nav
        className="navbar is-fixed-top has-shadow"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <NavLink to="/dashboard" className="navbar-item">
            <img src={logo} width="112" height="28" alt="logo" />
          </NavLink>

          <a
            href="!#"
            role="button"
            className="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                {user && (
                  <div className="navbar-item" style={{ display: "flex", alignItems: "center", cursor: "pointer", color: "#5092f5" }}>
                    <span className="icon" style={{ marginRight: "8px" }}>
                      <i className="fas fa-user"></i>
                    </span>
                    <span>{user.name}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
