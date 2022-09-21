import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";

import style from "./Home.module.scss";
import classNames from "classnames/bind";

import errorInfor from "~/utils/errorInfor";
import ScrollOnTop from "~/components/ScrollOnTop";
import * as httpRequest from "~/utils/httpRequest";
import { IconNext, IconBack } from "~/static/Icons";
import { GlobalState } from "~/components/GlobalState";
const cx = classNames.bind(style);

export default function Home() {
  const state = useContext(GlobalState);
  const [products, setProducts] = state.products;
  const [productsValueOption, setProductsValueOption] = useState("createAt");
  const [page, setPage] = useState(1);
  useEffect(() => {
    (async () => {
      try {
        const data = await httpRequest.get(
          `/api/product?sort=${productsValueOption}&page=${page}&limit=9`
        );
        setProducts(data.products);
        console.log(data.products);
      } catch (error) {
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
            <b>${product.price}</b>
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
      {renderProducts()}
      <div className={cx("page_actions")}>
        <button disabled={!(page > 1)} onClick={handleBackPage}>
          <IconBack className={cx("action_icon")} />
        </button>
        <span className={cx("page_number")}>{page}</span>
        <button onClick={handleNextPage}>
          <IconNext className={cx("action_icon")} />
        </button>
        {/* <div onClick={handleClickMoveTop} className={cx("on_top")}></div> */}
        <ScrollOnTop></ScrollOnTop>
      </div>
    </div>
  );
}
