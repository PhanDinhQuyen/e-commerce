import React, { createContext } from "react";

import style from "./SideBar.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(style);

export default function SideBar() {
  return (
    <div>
      <ul className={cx("list-menu")}>
        <li>Home</li>
        <li>About</li>
        <li>Shop</li>
        <li>FAQ</li>
        <li>Contact</li>
      </ul>
      <ul>
        <li>Facebook</li>
        <li>Twiter</li>
        <li>Google</li>
        <li>Link</li>
        <li>Intagram</li>
      </ul>
    </div>
  );
}
