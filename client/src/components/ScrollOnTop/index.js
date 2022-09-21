import { useState } from "react";
import classNames from "classnames/bind";

import style from "./ScrollOnTop.module.scss";
import { useEffect } from "react";

const cx = classNames.bind(style);

export default function ScrollOnTop() {
  const [visible, setVisible] = useState(false);
  // const [opacity, setOpacity] = useState(false);

  const toggleVisible = () => {
    if (window.pageYOffset > 200) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const handleClickMoveTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisible);
    return () => window.removeEventListener("scroll", toggleVisible);
  }, []);

  return (
    <button
      onClick={handleClickMoveTop}
      style={{ right: visible ? "2rem" : "-5rem" }}
      className={cx("wrapper")}
    ></button>
  );
}
