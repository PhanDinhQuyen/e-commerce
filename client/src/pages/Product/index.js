import { useContext } from "react";
import { GlobalState } from "~/components";
import classNames from "classnames/bind";

import style from "./Product.module.scss";

const cx = classNames.bind(style);

export default function Product() {
  const state = useContext(GlobalState);

  const [products] = state.productsAPI.products;
  console.log(products);

  return (
    <div className={cx("wrapper")}>
      {products.map((product) => {
        const description = product.description
          .split(" ")
          .slice(0, 8)
          .join(" ");

        return (
          <div className={cx("wrapper-image")}>
            <img key={product._id} src={product.image.url} width='200' alt='' />
            <h3>{product.title}</h3>
            <p>{description} ...</p>
            <span className={cx("price")}>Price: ${product.price}</span>
          </div>
        );
      })}
    </div>
  );
}
