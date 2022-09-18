import style from "./Header.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { GlobalState } from "~/components/GlobalState";
import { useContext } from "react";
import * as httpRequest from "~/utils/httpRequest";

import Search from "./Search";

const cx = classNames.bind(style);

export default function Header() {
  const state = useContext(GlobalState);
  const [isLogin] = state.user.login;
  const [isAdmin] = state.user.admin;
  const handleClickButton = async () => {
    await httpRequest.get("/user/logout");
    localStorage.removeItem("userLogin");
    window.location.reload();
  };
  const handleClickLogo = () => {
    window.location.href("/");
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <Link onClick={handleClickLogo} to='/'>
          Logo
        </Link>
        <Search />
        <div>
          {isAdmin && <Link to='/admin/manage'>Manage</Link>}
          {!isLogin ? (
            <Link className={cx("login_btn")} to='/login'>
              Login
            </Link>
          ) : (
            <button className={cx("logout_btn")} onClick={handleClickButton}>
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
