import Header from "./components/Header";
import classNames from "classnames/bind";
import ScrollOnTop from "~/components/ScrollOnTop";
import style from "./DefaultLayout.module.scss";
import Back from "~/components/GoBack";
const cx = classNames.bind(style);
export default function DefaultLayout({ children }) {
  return (
    <>
      <Header />
      <div className={cx("wrapper")}>
        {/* <Back /> */}
        {children}
      </div>
      <ScrollOnTop />
    </>
  );
}
