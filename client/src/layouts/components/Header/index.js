import { Link } from "react-router-dom";

import { AiOutlineBars, AiOutlineShoppingCart } from "react-icons/ai";

import { FaMapMarkerAlt } from "react-icons/fa";

import classNames from "classnames/bind";
import style from "./Header.module.scss";

import Search from "./Search";

const cx = classNames.bind(style);

function Header() {
  return (
    <header>
      <div className={cx("wrapper")}>
        <Link to='/'>Logo</Link>
        <div className={cx("menu")}>
          <Search />
          <ul className={cx("list-menu")}>
            <li>
              <FaMapMarkerAlt />
            </li>
            <li>
              <AiOutlineShoppingCart />
            </li>
            <li>
              <AiOutlineBars />
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
