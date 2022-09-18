import classNames from "classnames/bind";
import style from "./Search.module.scss";

const cx = classNames.bind(style);
export default function Search() {
  return (
    <div className={cx("wrapper")}>
      <input
        type='text'
        name='search'
        id='search'
        placeholder='Enter product your search here ...'
      />
    </div>
  );
}
