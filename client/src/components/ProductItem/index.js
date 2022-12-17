import classNames from "classnames/bind";

import style from "./ProductItem.module.scss";

const cx = classNames.bind(style);

export default function ProductItem({ product, addCart }) {
  const { title, image, content, category, description, price } = product;
  return (
    <div className={cx("wrapper")}>
      <div className={cx("image")}>
        <img src={image.url} alt='' loading='lazy' />
      </div>
      <div className={cx("detail")}>
        <div className={cx("infor")}>
          <h2>{title}</h2>
          <p>{category}</p>
          <p>{content}</p>
          <p>{description}</p>
          <b>Price: {price}$</b>
        </div>
        <button onClick={() => addCart(product)} className={cx("buy")}>
          Buy now
        </button>
      </div>
    </div>
  );
}
