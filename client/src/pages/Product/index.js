import { useContext } from "react";
import { GlobalState } from "~/components";
import classNames from "classnames/bind";
import Loading from "~/components/Loading";
import style from "./Product.module.scss";
import { useState } from "react";
import httpRequest from "~/utils/httpRequest";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const cx = classNames.bind(style);

export default function Product() {
  const state = useContext(GlobalState);
  const [products, setProducts] = state.productsAPI.products;

  const [valueOption, setValueOption] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    async function fetchDataProduct() {
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
    }
    fetchDataProduct();
  }, [setProducts, valueOption, page]);
  const handleOnChangeSelect = (e) => {
    // console.log(e.target.value);
    setValueOption(e.target.value);
    setPage(1);
  };
  // console.log(products);
  const renderProducts = () => (
    <div className={cx("wrapper")}>
      {products.map((product) => {
        const description = product.description
          .split(" ")
          .slice(0, 8)
          .join(" ");
        return (
          <Link key={product._id} to={`/detail/${product._id}`}>
            <div className={cx("wrapper-image")}>
              <img
                key={product._id}
                src={product.image.url}
                width='200'
                alt=''
              />
              <h3>{product.title}</h3>
              <p>{description} ...</p>
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
        <button
          onClick={() => {
            setPage(page - 1);
            window.scrollTo(0, 0);
          }}
          disabled={page === 1}
        >
          Pre
        </button>
        <span>{page}</span>
        <button
          onClick={() => {
            setPage(page + 1);
            window.scrollTo(0, 0);
          }}
          disabled={products.length !== 8}
        >
          Next
        </button>
      </div>
    </>
  );
}
