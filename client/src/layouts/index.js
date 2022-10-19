import Header from "./components/Header";
import classNames from "classnames/bind";

import style from "./DefaultLayout.module.scss";

const cx = classNames.bind(style);
export default function DefaultLayout({ children }) {
  return (
    <>
      <Header />
      <div className={cx("wrapper")}>{children}</div>
    </>
  );
}
