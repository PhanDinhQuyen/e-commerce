import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import classNames from "classnames/bind";
import style from "./DetailProduct.module.scss";

import { GlobalState } from "~/components/GlobalState";
import * as httpRequest from "~/utils/httpRequest";
import { useState } from "react";

const cx = classNames.bind(style);

export default function DetailProduct() {
  const { id } = useParams();

  const [products, setProducts] = useState(null);
  useEffect(() => {
    (async () => {
      const productFind = await httpRequest.get(`/api/product/${id}`);
      setProducts(productFind.product);
    })();
  }, [id]);

  if (!products) return;
  return (
    <div className={cx("wrapper")}>
      <h2>{products.title}</h2>
      <div className={cx("product_img")}>
        <img src={products.image.url} alt='' />
      </div>
      <p className={cx("product_description")}>{products.description}</p>
      <p>
        $<b>{products.price}</b>
      </p>
    </div>
  );
}
