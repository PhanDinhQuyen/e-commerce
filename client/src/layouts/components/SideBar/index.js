// import React, { createContext } from "react";

import style from "./SideBar.module.scss";
import classNames from "classnames/bind";

import { AiOutlineHome } from "react-icons/ai";

import { Link } from "react-router-dom";

const cx = classNames.bind(style);

export default function SideBar() {
  const listActions = [
    { name: "Home", icon: <AiOutlineHome />, path: "/" },
    { name: "About", icon: <AiOutlineHome />, path: "/about" },
    { name: "Products", icon: <AiOutlineHome />, path: "/products" },
    { name: "Login/Register", icon: <AiOutlineHome />, path: "/login" },
    { name: "Contact", icon: <AiOutlineHome /> },
  ];
  const listLinks = [
    { name: "Facebook", url: "" },
    { name: "Twitter", url: "" },
    { name: "Google Plus", url: "" },
    { name: "Link", url: "" },
    { name: "Intagram", url: "" },
  ];
  console.log(window.location.pathname);
  return (
    <div>
      <ul className={cx("list-menu")}>
        {listActions.map((item, index) => (
          <li
            className={cx(window.location.pathname === item.path && "active")}
            key={index}
          >
            <Link to={item.path || ""}>
              {item.icon} <span>{item.name}</span>
            </Link>
          </li>
        ))}
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
