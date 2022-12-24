import { useNavigate, useLocation } from "react-router-dom";
import classNames from "classnames/bind";

import style from "./Back.module.scss";

import { IoChevronBackCircleOutline } from "react-icons/io5";

const cx = classNames.bind(style);

export default function Back() {
  const navigation = useNavigate();
  const { pathname } = useLocation();

  return pathname === "/" ? null : (
    <button className={cx("wrapper")} onClick={() => navigation(-1)}>
      <IoChevronBackCircleOutline />
    </button>
  );
}
