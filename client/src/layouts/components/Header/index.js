import style from "./Header.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

export default function Header() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <div>Logo</div>
        <div>
          <input
            type='text'
            name='search'
            id='search'
            placeholder='Enter product'
          />
        </div>
        <div>Action</div>
      </div>
    </div>
  );
}
