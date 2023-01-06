import classNames from "classnames/bind";
import { Link } from "react-router-dom";

import style from "./ProductItem.module.scss";

import { CgTrash } from "react-icons/cg";

const cx = classNames.bind(style);

export default function ProductItem({
  product,
  addCart,
  removeProduct,
  isAdmin,
}) {
  const {
    title,
    image,
    content,
    category,
    description,
    price,
    product_id,
    _id,
  } = product;
  return (
    <div className={cx("wrapper")}>
      {isAdmin && (
        <button className={cx("remove")} onClick={() => removeProduct(_id)}>
          <CgTrash />
        </button>
      )}
      <div className={cx("image")}>
        <img src={image.url} alt='' loading='lazy' />
      </div>
      <div className={cx("detail")}>
        <div className={cx("infor")}>
          <h2>{title}</h2>
          <p>#{product_id}</p>
          <p>{category}</p>
          <p>{content}</p>
          <p>{description}</p>
          <b>Price: {price}$</b>
        </div>
        <button onClick={() => addCart(product)} className={cx("buy")}>
          <Link
            style={{ width: "100%", display: "block", padding: "1rem 2rem" }}
            to='/user/cart'
          >
            Buy now
          </Link>
        </button>
      </div>
    </div>
  );
}
