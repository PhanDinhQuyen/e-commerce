import { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import classNames from "classnames/bind";
import style from "./DetailProduct.module.scss";

import { GlobalState } from "~/components/GlobalState";
import * as httpRequest from "~/utils/httpRequest";
import { useState } from "react";

import Loading from "~/components/Loading";
import errorInfor from "~/utils/errorInfor";
import ProductItem from "~/components/ProductItem";

const cx = classNames.bind(style);

export default function DetailProduct() {
  const { id } = useParams();
  const state = useContext(GlobalState);
  const addCart = state.user.addCart;
  const [productState] = state.products;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const [product] = productState.filter((item) => item._id === id);
    if (product) {
      setProduct(product);
      setLoading(false);
    } else {
      (async () => {
        try {
          const productFind = await httpRequest.get(`/api/product/${id}`);
          setProduct(productFind.product);
          setLoading(false);
        } catch (error) {
          setLoading(false);
          errorInfor(error);
        }
      })();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  const scrollTop = (option) => {
    window.scrollTo({
      top: 0,
      behavior: option ? "smooth" : "auto",
    });
  };

  if (!product) {
    return (
      <div className={cx("wrapper")}>
        <Loading />
      </div>
    );
  }

  return (
    <div className={cx("wrapper")}>
      {!loading && (
        <>
          <ProductItem product={product} addCart={addCart} />
          <div className={cx("related")}>
            <h3>Related Product</h3>
            <div className={cx("related_product")}>
              {productState
                .filter((item) => item._id !== product._id)
                .slice(0, 3)
                .map((item) => (
                  <Link
                    onClick={() => scrollTop(true)}
                    to={`/product/detail/${item._id}`}
                    key={item?._id}
                    className={cx("product")}
                  >
                    <div className={cx("image")}>
                      <img src={item.image.url} alt='' />
                    </div>
                    <h4>{item?.title}</h4>
                  </Link>
                ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
