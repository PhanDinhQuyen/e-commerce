import React from "react";
import classNames from "classnames/bind";
import style from "./Search.module.scss";
import { FiSearch } from "react-icons/fi";
import Tippy from "@tippyjs/react/headless";
import { useEffect, useState } from "react";
import httpRequest from "~/utils/httpRequest";

import useDebounce from "~/hooks/useDebounce ";

const cx = classNames.bind(style);

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);

  const debounceValue = useDebounce(searchTerm, 1000);

  useEffect(() => {
    if (!debounceValue.trim()) return;
    (async () => {
      try {
        const response = await httpRequest.get(
          `api/products?lower_title[regex]=${encodeURIComponent(
            debounceValue.replace(/[!@#$%^&*]/g, "").toLowerCase()
          )}`
        );
        setProducts(response.data.products);
      } catch (e) {
        throw new Error(e.response.data.msg);
      }
    })();
  }, [debounceValue]);

  const handleOnChangeInput = (e) => {
    setProducts([]);
    const value = e.target.value;
    if (value.startsWith(" ")) return;
    setSearchTerm(value);
  };
  return (
    <div className={cx("wrapper-tippy")}>
      <Tippy
        interactive
        placement='bottom'
        visible={products.length > 0}
        render={(attrs) => (
          <ul className={cx("list-products")} tabIndex='-1' {...attrs}>
            {products.map((product) => (
              <li key={product._id}>
                <img src={product.image.url} width='50' height='50' alt='' />
                <div className={cx("product-detail")}>
                  <p>{product.title}</p>
                  <div className={cx("product-describe")}>
                    <p>Price: {product.price}$</p>
                    <input
                      type='checkbox'
                      defaultChecked={!product.checked}
                      interactive='false'
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      >
        <div className={cx("search")}>
          <button>
            <FiSearch />
          </button>
          <div className={cx("one-bar")}></div>
          <input
            type='text'
            placeholder='Search product...'
            value={searchTerm}
            onChange={handleOnChangeInput}
          />
        </div>
      </Tippy>
    </div>
  );
}