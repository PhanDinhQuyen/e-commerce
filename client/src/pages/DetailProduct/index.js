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
  const addCart = state.user.addCart;
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
  console.log(products);

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
          <div className={cx("product_img")}>
            <img src={products.image.url} alt='' />
          </div>
          <div className={cx("product_detail")}>
            <h2>
              {products.title}
              <span className={cx("check")}></span>
            </h2>
            <div className={cx("product_price")}>
              <span>Price: </span>$<b>{products.price}</b>
            </div>
            <p className={cx("product_description")}>{products.description}</p>
            <p className={cx("product_content")}>{products.content}</p>
            <span>Sold: {products.sold}</span>
            <button onClick={() => addCart(products)} className={cx("buy")}>
              Buy now
            </button>
          </div>
        </>
      )}
    </div>
  );
}
