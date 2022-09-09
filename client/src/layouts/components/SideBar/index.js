// import React, { createContext } from "react";

import style from "./SideBar.module.scss";
import classNames from "classnames/bind";

import { AiOutlineHome } from "react-icons/ai";

import { Link } from "react-router-dom";

import { useContext } from "react";

import { GlobalState } from "~/components";
import { useEffect } from "react";
// import { useState } from "react";
const cx = classNames.bind(style);

export default function SideBar() {
  const state = useContext(GlobalState);

  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;
  const listActions = [
    { name: "Home", icon: <AiOutlineHome />, path: "/" },
    { name: "About", icon: <AiOutlineHome />, path: "/about" },
    { name: "Products", icon: <AiOutlineHome />, path: "/products" },
    { name: "Contact", icon: <AiOutlineHome />, path: "/contact" },
  ];
  const listLinks = [
    { name: "Facebook", url: "" },
    { name: "Twitter", url: "" },
    { name: "Google Plus", url: "" },
    { name: "Link", url: "" },
    { name: "Intagram", url: "" },
  ];

  useEffect(() => {
    localStorage.setItem("currentPathName", window.location.pathname);
    if (localStorage.getItem("currentPathName") !== "/products") {
      localStorage.removeItem("product");
      localStorage.removeItem("page");
      localStorage.removeItem("positionY");
      window.scrollTo(0, 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.pathname]);

  return (
    <div className={cx("wrapper")}>
      <ul className={cx("list-menu")}>
        {listActions.map((item, index) => (
          <li
            className={cx(window.location.pathname === item.path && "active")}
            key={index}
          >
            <Link to={item.path}>
              {item.icon} <span>{item.name}</span>
            </Link>
          </li>
        ))}
        {!isLogged && (
          <li>
            <Link to='/login'>
              <AiOutlineHome />
              <span>Login/Register</span>
            </Link>
          </li>
        )}
        {isAdmin && (
          <li>
            <Link to='/admin/manager'>Product Management</Link>
          </li>
        )}
      </ul>
      <ul className={cx("list-link")}>
        {listLinks.map((link, index) => (
          <li key={index}>
            <a href={link.url}>{link.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
