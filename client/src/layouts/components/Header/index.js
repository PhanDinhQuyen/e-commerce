import { Link } from "react-router-dom";

import { AiOutlineBars, AiOutlineShoppingCart } from "react-icons/ai";

import classNames from "classnames/bind";
import style from "./Header.module.scss";

import Search from "./Search";

import { useContext } from "react";

import { GlobalState } from "~/components";

import httpRequest from "~/utils/httpRequest";
const cx = classNames.bind(style);

function Header() {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;

  const handleLogout = async () => {
    try {
      httpRequest.get("/user/logout");

      localStorage.removeItem("userLogin");
      window.location.reload();
    } catch (e) {
      throw new Error(e);
    }
  };

  return (
    <header>
      <div className={cx("wrapper")}>
        <Link to='/'>Logo</Link>
        <div className={cx("menu")}>
          <Search />
          <ul className={cx("list-menu")}>
            <li>
              <AiOutlineShoppingCart />
            </li>
            <li>
              <AiOutlineBars />
            </li>
            {isLogged && (
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
