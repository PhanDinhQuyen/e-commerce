import { useEffect, useContext, useState, useRef } from "react";
import { Link } from "react-router-dom";

import { GlobalState } from "~/components";
import Loading from "~/components/Loading";
import httpRequest from "~/utils/httpRequest";

import style from "./Product.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

export default function Product() {
  const state = useContext(GlobalState);
  const [products, setProducts] = state.productsAPI.products;

  const [valueOption, setValueOption] = useState(
    localStorage.getItem("product") || "createAt"
  );

  const [page, setPage] = useState(
    JSON.parse(localStorage.getItem("page")) || 1
  );

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, localStorage.getItem("positionY") || 0);

    setLoading(true);

    localStorage.setItem("page", page);
    localStorage.setItem("product", valueOption);

    (async function () {
      try {
        const res = await httpRequest.get(
          `/api/products?sort=${valueOption}&page=${page}`
        );

        setProducts(res.data.products);
        setLoading(false);
      } catch (err) {
        setLoading(false);

        throw new Error(err);
      }
    })();
  }, [setProducts, valueOption, page]);
  const handleOnChangeSelect = (e) => {
    setValueOption(e.target.value);
    setPage(1);
  };

  const handlePrePage = () => {
    setPage((page) => page - 1);
    window.scrollTo(0, 0);
    console.log(page);
  };
  const handleNextPage = () => {
    setPage((page) => page + 1);
    window.scrollTo(0, 0);
  };
  const renderProducts = () => (
    <div className={cx("wrapper")}>
      {products.slice(0, 8).map((product) => {
        const description = product.description.slice(0, 40);
        return (
          <Link
            onClick={() => {
              localStorage.setItem("positionY", window.pageYOffset);
            }}
            key={product._id}
            to={`/detail/${product._id}`}
          >
            <div className={cx("wrapper-image")}>
              <img
                key={product._id}
                src={product.image.url}
                width='200'
                alt=''
              />
              <h3>{product.title}</h3>
              <p>{description}...</p>
              <span className={cx("price")}>Price: ${product.price}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
  return (
    <>
      <div className={cx("wrapper-select")}>
        <select
          className={cx("select")}
          onChange={handleOnChangeSelect}
          value={valueOption}
        >
          <option value='createdAt'>New</option>
          <option value='-createdAt'>Old</option>
          <option value='price'>Price</option>
          <option value='-price'>-Price</option>
        </select>
      </div>

      {!loading ? renderProducts() : <Loading />}

      <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
        <button disabled={page <= 1} onClick={handlePrePage}>
          Pre
        </button>
        <span>{page}</span>
        <button disabled={products.length !== 8} onClick={handleNextPage}>
          Next
        </button>
      </div>
    </>
  );
}
