// import React from "react";
import style from "./Loading.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

export default function Loading() {
  return <div className={cx("loading")}></div>;
}
