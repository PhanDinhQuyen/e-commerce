/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, To } from "react-router-dom";
import { CgMenu, CgClose } from "react-icons/cg";

import style from "./Header.module.scss";
import classNames from "classnames/bind";

import { GlobalState } from "~/components/GlobalState";
import * as httpRequest from "~/utils/httpRequest";

import Search from "./Search";
import errorInfor from "~/utils/errorInfor";

const cx = classNames.bind(style);

export default function Header() {
  const state = useContext(GlobalState);
  const [isLogin, setLogin] = state.user.login;
  const [_, setAdmin] = state.user.admin;
  const [close, setClose] = useState(false);
  const { pathname } = useLocation();
  const handleClickButton = () => {
    localStorage.removeItem("userLogin");
    (async () => {
      try {
        await httpRequest.get("/user/logout");
      } catch (e) {
        errorInfor(e);
      }
    })();
    window.location.assign("/");
    setAdmin(false);
    setLogin(false);
  };

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth > 786) {
        setClose(false);
      }
    });
  }, []);

  const handleClickLogo = () => {
    if (pathname === "/") {
      window.location.assign("/");
    }
  };

  const hanleCloseMenu = () => {
    setClose(!close);
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <Link onClick={handleClickLogo} to='/'>
          Logo
        </Link>
        <Search />
        <div
          onClick={() => setClose(!close)}
          className={cx("list_action", close && "list_action_active")}
        >
          <Link to='/user/cart'>Cart</Link>

          {isLogin && <Link to='/user/historyOrder'>History</Link>}
          {!isLogin ? (
            <Link className={cx("login_btn")} to='/login'>
              Log in
            </Link>
          ) : (
            <button
              className={cx("logout_btn")}
              onClick={() => handleClickButton()}
            >
              Log out
            </button>
          )}
        </div>
        <button onClick={hanleCloseMenu} className={cx("bar")}>
          {!close ? <CgMenu /> : <CgClose />}
        </button>
      </div>
    </div>
  );
}
