import { useContext } from "react";
import { GlobalState } from "~/components";
import classNames from "classnames/bind";
import Loading from "~/components/Loading";
import style from "./Product.module.scss";
import { useState } from "react";
import httpRequest from "~/utils/httpRequest";
import { useEffect } from "react";

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
          `/api/products?sort=${valueOption}&page=${page}&limit=9`
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
    <>
      <select onChange={handleOnChangeSelect} value={valueOption}>
        <option value=''>New</option>
        <option value='-updatedAt'>Old</option>
        <option value='price'>Price</option>
        <option value='-price'>-Price</option>
      </select>
      <div className={cx("wrapper")}>
        {products.map((product) => {
          const description = product.description
            .split(" ")
            .slice(0, 8)
            .join(" ");
          return (
            <div key={product._id} className={cx("wrapper-image")}>
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
          );
        })}
      </div>
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
          disabled={products.length !== 9}
        >
          Next
        </button>
      </div>
    </>
  );
  return !loading ? renderProducts() : <Loading />;
}
