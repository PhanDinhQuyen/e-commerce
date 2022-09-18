import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { GlobalState } from "~/components/GlobalState";

import classNames from "classnames/bind";
import style from "./Home.module.scss";
import { useEffect } from "react";
import * as httpRequest from "~/utils/httpRequest";

import { IconNext, IconBack } from "~/static/icons";

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
        throw new Error(error);
      }
    })();
  }, [productsValueOption, page, setProducts]);
  const handleChangeSelect = (e) => {
    e.preventDefault();
    setProductsValueOption(e.target.value);
  };

  const handleBackPage = () => {
    setPage((preValue) => preValue - 1);
    localStorage.setItem("page", page - 1);
  };
  const handleNextPage = () => {
    setPage((preValue) => preValue + 1);
    localStorage.setItem("page", page + 1);
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
              <p>{product.description}</p>
              <h2 className={cx("product_title")}>{product.title}</h2>
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
      </div>
    </div>
  );
}
