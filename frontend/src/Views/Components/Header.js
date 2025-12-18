import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import $ from "jquery";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "universal-cookie";
import { changeFilterSearchModelState } from "../../Database/Action/ConstantAction";
import { myThemeColor } from "../Constant/MainFile";

// let $sidebar = $('body')

const Header = () => {
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const [checkTheme, setCheckTheme] = useState("dark");
  const [themeSetting, setThemeSetting] = useState({
    headerColor: "",
    headerTextColor: "",
    bodyColor: "",
    themeColor: "",
    themeColorTitile: "",
  });
  const cookies = new Cookies();
  const themeCookie = cookies.get("themeSetting");

  const changeTheme = () => {
    let $sidebar = $("body");
    if ($sidebar.hasClass("dark-skin")) {
      $sidebar.removeClass("dark-skin");
      $sidebar.addClass("light-skin");
      setCheckTheme("dark");
      cookies.set("solorTheme", "light", { path: "/" });
      cookies.set(
        "themeSetting",
        JSON.stringify({
          headerColor: "",
          headerTextColor: "",
          bodyColor: "",
          themeColor: "#0052cc",
          themeColorTitile: "theme-primary"
        }),
        { path: "/" }
      );
      window.location.reload(false);
    } else {
      $sidebar.removeClass("light-skin");
      $sidebar.addClass("dark-skin");
      setCheckTheme("light");
      cookies.set("solorTheme", "dark", { path: "/" });
      cookies.set(
        "themeSetting",
        JSON.stringify({
          headerColor: "",
          headerTextColor: "",
          bodyColor: "",
          themeColor: "#0052cc",
          themeColorTitile: "theme-primary"
        }),
        { path: "/" }
      );
      window.location.reload(false);
    }
  };

  useEffect(() => {
    if (themeCookie !== undefined) {
      setThemeSetting(themeCookie);
    }
  }, []);

  return (
    <Wrapper>
      <header
        ref={formRef}
        className="main-header"
        style={{ backgroundColor: themeSetting.headerColor }}
      >
        <div
          className="inside-header"
          style={{ backgroundColor: themeSetting.headerColor }}
        >
          <div className="d-flex align-items-center logo-box justify-content-start">
            {/* Logo */}
            <NavLink to={"/dashboard"} className="logo">
              {/* logo*/}
              <div className="logo-lg">
                <span className="light-logo">
                  <img src="text.png" alt="logo" />
                </span>
                <span className="dark-logo">
                  <img src="text.png" alt="logo" />
                </span>
              </div>
            </NavLink>
          </div>
          {/* Header Navbar */}
          <nav className="navbar navbar-static-top">
            {/* Sidebar toggle button*/}
            <div className="app-menu">
              {/* <div className="search-bx" style={{ marginLeft: "20px" }}>
                <form>
                  <div className="input-group">
                    <input
                      type="search"
                      className="form-control"
                      placeholder="Search Location"
                      onClick={() =>
                        dispatch(changeFilterSearchModelState(true))
                      }
                    />
                    <div className="input-group-append">
                      <button className="btn" type="submit" id="button-addon3">
                        <i className="icon-Search">
                          <span className="path1" />
                          <span className="path2" />
                        </i>
                      </button>
                    </div>
                  </div>
                </form>
              </div> */}
            </div>
            <div className="navbar-custom-menu r-side">
              <ul className="nav navbar-nav">
                <li className="dropdown notifications-menu btn-group">
                  <label className="switch">
                    <a className="
                    
                    
                    ">
                      <input
                        type="checkbox"
                        checked={checkTheme === "light"}
                        onChange={changeTheme}
                      />
                      {/* <input
                        type="checkbox"
                        onClick={() => changeTheme()}
                      data-mainsidebarskin="toggle"
                      id="toggle_left_sidebar_skin"
                      /> */}
                      <span className="switch-on">
                        <i data-feather="moon" />
                      </span>
                      <span className="switch-off">
                        <i data-feather="sun" />
                      </span>
                    </a>
                  </label>
                </li>
                <li className="btn-group nav-item d-xl-inline-flex d-none">
                  <a
                    href="#"
                    data-provide="fullscreen"
                    className="waves-effect waves-light nav-link btn-primary-light svg-bt-icon"
                    title="Full Screen"
                  >
                    <i data-feather="maximize" />
                  </a>
                </li>
                <li className="dropdown user user-menu">
                  <a
                    href="#"
                    className="waves-effect waves-light dropdown-toggle w-auto l-h-12 bg-transparent p-0 no-shadow"
                    title="User"
                    data-bs-toggle="modal"
                    data-bs-target="#quick_user_toggle"
                  >
                    <img
                      src="src/images/avatar/avatar-13.png"
                      className="avatar rounded-circle bg-primary-light h-40 w-40"
                      alt=""
                    />
                  </a>
                </li>
                <li className="btn-group nav-item d-xl-inline-flex d-none">
                  <a
                    href="#"
                    title="User"
                    data-bs-toggle="modal"
                    data-bs-target="#change_theme"
                    className="waves-effect waves-light nav-link btn-primary-light svg-bt-icon me-0"
                  >
                    <i data-feather="sliders" />
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </header>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  /* .main-header{
background-color: red !important;
} */
`;

export default Header;
