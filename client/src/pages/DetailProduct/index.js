import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import classNames from "classnames/bind";
import style from "./DetailProduct.module.scss";

import { GlobalState } from "~/components/GlobalState";
import * as httpRequest from "~/utils/httpRequest";
import { useState } from "react";

import Loading from "~/components/Loading";
import errorInfor from "~/utils/errorInfor";

const cx = classNames.bind(style);

export default function DetailProduct() {
  const { id } = useParams();
  const state = useContext(GlobalState);
  const [productState] = state.products;
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const [product] = productState.filter((product) => product._id === id);
    if (product) {
      setProducts(product);
      setLoading(false);
    } else {
      (async () => {
        try {
          const productFind = await httpRequest.get(`/api/product/${id}`);
          setProducts(productFind.product);
          setLoading(false);
        } catch (error) {
          setLoading(false);
          errorInfor(error);
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (!products)
    return (
      <div className={cx("wrapper")}>
        <Loading />
      </div>
    );
  return (
    <div className={cx("wrapper")}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <h2>{products.title}</h2>
          <div className={cx("product_img")}>
            <img src={products.image.url} alt='' />
          </div>
          <p className={cx("product_description")}>{products.description}</p>
          <p>
            $<b>{products.price}</b>
          </p>
        </>
      )}
    </div>
  );
}
