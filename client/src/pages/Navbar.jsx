import React from "react";
import { NavLink } from "react-router-dom";
import SchoolIcon from "../assets/icons/school_icon.svg";

function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-light shadow">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                {/* <NavLink className="nav-link active" aria-current="page" to="/">
                <img
                  src={SchoolIcon}
                  alt=""
                  style={{ width: "60px", height: "35px", marginRight:"10px"}} // Adjust width and height as needed
                />
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="About">
                  About
                </NavLink> */}
              </li>
            </ul>
            <NavLink className="navbar-brand fw-bolder fs-4 mx-auto" to="/">
            Aisleschool
            </NavLink>
            <NavLink
              to="/login"
              className="btn btn-outline-primary ms-auto px-4 rounded-pill"
            >
              <i className="fa fa-sign-in me-2"></i>サインイン
            </NavLink>
            <NavLink
              to="/register"
              className="btn btn-outline-primary ms-2 px-4 rounded-pill"
            >
              <i className="fa fa-user-plus me-2"></i>登録
            </NavLink>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
