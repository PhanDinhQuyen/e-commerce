import { useState, useLayoutEffect, useRef, useCallback } from "react";
import classNames from "classnames/bind";

import style from "./ScrollOnTop.module.scss";

const cx = classNames.bind(style);

export default function ScrollOnTop() {
  const [visible, setVisible] = useState(false);

  const toggleVisible = useCallback(() => {
    if (window.pageYOffset > 200) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, []);

  const handleClickMoveTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const scrollEventListener = useRef();

  useLayoutEffect(() => {
    scrollEventListener.current = toggleVisible;
    window.addEventListener("scroll", scrollEventListener.current);

    return () => {
      window.removeEventListener("scroll", scrollEventListener.current);
    };
  }, [toggleVisible]);

  return (
    <button
      onClick={handleClickMoveTop}
      style={{ right: visible ? "2rem" : "-5rem" }}
      className={cx("wrapper")}
    ></button>
  );
}
