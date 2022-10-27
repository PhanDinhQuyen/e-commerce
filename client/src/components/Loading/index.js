import style from "./Loading.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);
export default function Loading({ className }) {
  return <div className={cx("spinner", className)}></div>;
}
