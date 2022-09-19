import { useContext } from "react";
import { useParams } from "react-router-dom";

import classNames from "classnames/bind";
import style from "./DetailProduct.module.scss";

import { GlobalState } from "~/components/GlobalState";

const cx = classNames.bind(style);

export default function DetailProduct() {
  const { id } = useParams();
  const state = useContext(GlobalState);
  const [products] = state.products;

  const product = products.find((product) => product._id === id);
  if (!product) return null;
  return (
    <div className={cx("wrapper")}>
      <h2>{product.title}</h2>
      <div className={cx("product_img")}>
        <img src={product.image.url} alt='' />
      </div>
      <p className={cx("product_description")}>{product.description}</p>
      <p>
        $<b>{product.price}</b>
      </p>
    </div>
  );
}
