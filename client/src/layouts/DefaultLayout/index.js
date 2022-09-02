import { Header, Footer, SideBar } from "../components";
import { Fragment } from "react";
import classNames from "classnames/bind";
import style from "./Layout.module.scss";

const cx = classNames.bind(style);
export default function DefaultLayout({ children }) {
  return (
    <Fragment>
      <Header />
      <div className={cx("wrapper")}>
        <SideBar />
        <div className={cx("container")}>{children}</div>
      </div>
      <Footer />
    </Fragment>
  );
}
