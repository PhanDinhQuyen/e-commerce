import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";

import style from "./Home.module.scss";
import classNames from "classnames/bind";

import errorInfor from "~/utils/errorInfor";
import ScrollOnTop from "~/components/ScrollOnTop";
import * as httpRequest from "~/utils/httpRequest";
import { IconNext, IconBack } from "~/static/Icons";
import { GlobalState } from "~/components/GlobalState";
import Loading from "~/components/Loading";
const cx = classNames.bind(style);

export default function Home() {
  const state = useContext(GlobalState);
  const addCart = state.user.addCart;
  console.log(state.user);
  const [products, setProducts] = state.products;
  const [productsValueOption, setProductsValueOption] = useState("createAt");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const data = await httpRequest.get(
          `/api/product?sort=${productsValueOption}&page=${page}`
        );
        setProducts(data.products);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        errorInfor(error);
      }
    })();
  }, [productsValueOption, page, setProducts]);
  const handleChangeSelect = (e) => {
    e.preventDefault();
    setProductsValueOption(e.target.value);
  };

  const handleBackPage = () => {
    setPage((preValue) => preValue - 1);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const handleNextPage = () => {
    setPage((preValue) => preValue + 1);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const renderProducts = () => {
    return (
      <ul className={cx("list_products")}>
        {products.slice(0, 8).map((product) => (
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
                <button className={cx("button-30")}>View</button>
                <button
                  onClick={() => addCart(product)}
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
        <select onChange={handleChangeSelect}>
          <option value='createdAt'>Created At</option>
          <option value='-createdAt'>-Created At</option>
          <option value='price'>Price</option>
          <option value='-price'>-Price</option>
        </select>
      </div>
      {loading ? <Loading /> : renderProducts()}
      <div className={cx("page_actions")}>
        <button disabled={!(page > 1)} onClick={handleBackPage}>
          <IconBack className={cx("action_icon")} />
        </button>
        <span className={cx("page_number")}>{page}</span>
        <button onClick={handleNextPage}>
          <IconNext className={cx("action_icon")} />
        </button>
        <ScrollOnTop />
      </div>
    </div>
  );
}
