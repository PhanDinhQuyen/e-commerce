import { Link, useSearchParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";

import style from "./Home.module.scss";
import classNames from "classnames/bind";

import errorInfor from "~/utils/errorInfor";
import * as httpRequest from "~/utils/httpRequest";
import { IconNext, IconBack } from "~/static/Icons";
import { GlobalState } from "~/components/GlobalState";
import Loading from "~/components/Loading";
const cx = classNames.bind(style);

export default function Home() {
  const state = useContext(GlobalState);
  const addCart = state.user.addCart;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useSearchParams();
  const sortByCurrent = page.get("s") || "-createdAt";
  const pageCurrent = page.get("p") || 1;
  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const data = await httpRequest.get(
          `/api/product?sort=${sortByCurrent}&page=${pageCurrent}`
        );
        setProducts(data.products);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        errorInfor(error);
      }
    })();
  }, [setProducts, page, sortByCurrent, pageCurrent]);
  const handleChangeSelect = (e) => {
    e.preventDefault();
    setPage({
      s: e.target.value,
    });
  };

  const handleBackPage = () => {
    setPage({
      s: sortByCurrent,
      p: +pageCurrent - 1,
    });
    window.scrollTo({
      top: 0,
      // behavior: "smooth",
    });
  };
  const handleNextPage = () => {
    setPage({
      s: sortByCurrent,
      p: +pageCurrent + 1,
    });
    window.scrollTo({
      top: 0,
      // behavior: "smooth",
    });
  };
  const renderProducts = () => {
    return (
      <ul className={cx("list_products")}>
        {products.map((product) => (
          <li key={product._id}>
            <Link to={`/product/detail/${product._id}`}>
              <div className={cx("product_img")}>
                <img width='250' src={product.image.url} alt='' />
              </div>
              <h2 className={cx("product_title")}>{product.title}</h2>
              <p>{product.description}</p>
            </Link>
            <div className={cx("product_action")}>
              <b>${product.price}</b>
              <div className={cx("product_action_btn")}>
                <Link
                  to={`/product/detail/${product._id}`}
                  className={cx("button-30")}
                >
                  View
                </Link>
                <button
                  onClick={() => {
                    addCart(product);
                  }}
                  className={cx("button-30")}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    );
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("select")}>
        <select value={sortByCurrent} onChange={handleChangeSelect}>
          <option value='createdAt'>Created At</option>
          <option value='-createdAt'>-Created At</option>
          <option value='price'>Price</option>
          <option value='-price'>-Price</option>
        </select>
      </div>
      {loading ? <Loading /> : renderProducts()}
      <div className={cx("page_actions")}>
        <button disabled={!(pageCurrent > 1)} onClick={handleBackPage}>
          <IconBack className={cx("action_icon")} />
        </button>
        <span className={cx("page_number")}>{pageCurrent}</span>
        <button disabled={products.length === 0} onClick={handleNextPage}>
          <IconNext className={cx("action_icon")} />
        </button>
      </div>
    </div>
  );
}
