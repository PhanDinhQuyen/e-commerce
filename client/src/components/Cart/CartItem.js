import classNames from "classnames/bind";

import style from "./CartItem.module.scss";

import { AiFillCaretUp, AiFillCaretDown, AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";

const cx = classNames.bind(style);

export default function CartItem(props) {
  const {
    _id,
    title,
    image,
    category,
    quantity,
    price,
    handleDecrement,
    handleIncrement,
    handleDelete,
  } = props;
  return (
    <div className={cx("wrapper")}>
      <div className={cx("image")}>
        <div className={cx("wrapper_img")}>
          <img src={image.url} alt='' />
        </div>
        <div className={cx("detail")}>
          <Link to={`/product/detail/${_id}`}>
            <h2>{title}</h2>
          </Link>
          <p>{category}</p>
        </div>
      </div>
      <div className={cx("action")}>
        <div className={cx("quantity")}>
          <p>{quantity}</p>
          <div className={cx("quantity_button")}>
            <button onClick={() => handleIncrement(_id)}>
              <AiFillCaretUp />
            </button>
            <button
              disabled={quantity < 2}
              onClick={() => handleDecrement(_id)}
            >
              <AiFillCaretDown />
            </button>
          </div>
        </div>
        <div className={cx("price")}>{price * quantity}$</div>
        <button className={cx("delete")} onClick={() => handleDelete(_id)}>
          <AiFillDelete />
        </button>
      </div>
    </div>
  );
}
