import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Tippy from "@tippyjs/react/headless";

import style from "./Search.module.scss";
import classNames from "classnames/bind";

import { useDebounce } from "~/hooks";
import * as httpRequest from "~/utils/httpRequest";
import { IconSearch, IconClose } from "~/static/Icons";

const cx = classNames.bind(style);

export default function Search() {
  const inputRef = useRef();
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [listProductSearch, setListProductSearch] = useState([]);
  const [hideListProductSearch, setHideListProductSearch] = useState(false);
  const debounceValue = useDebounce(searchTerm, 300);

  // localStorage.setItem("listProductSearch", JSON.stringify(listProductSearch));

  useEffect(() => {
    if (!debounceValue) return;
    setLoading(true);

    (async () => {
      try {
        // console.log(searchTerm);
        const data = await httpRequest.get("/api/product", {
          params: {
            "lower_title[regex]": debounceValue,
          },
        });
        setListProductSearch(data.products);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        throw new Error(err);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceValue]);
  const handleChangeSearch = (e) => {
    setSearchTerm(e.target.value);
    setListProductSearch([]);
  };
  const handleShowListProduct = () => {
    setHideListProductSearch(false);
  };
  const handleRemoveSearchTearm = () => {
    setSearchTerm("");
    setListProductSearch([]);
    inputRef.current.focus();
  };
  const handleHideListProduct = () => {
    setHideListProductSearch(true);
  };
  return (
    <div className={cx("wrapper-tippy")}>
      <Tippy
        interactive={true}
        visible={listProductSearch.length > 0 && !hideListProductSearch}
        onClickOutside={handleHideListProduct}
        render={(attrs) => (
          <ul className={cx("box-tippy")} tabIndex='-1' {...attrs}>
            {listProductSearch.map((product) => (
              <li key={product._id}>
                <Link
                  onClick={handleHideListProduct}
                  to={`/product/detail/${product._id}`}
                >
                  {/* <img width='100px' src={product.image.url} alt='' /> */}
                  <p>{product.title}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      >
        <div className={cx("wrapper")}>
          <input
            type='text'
            name='search'
            id='search'
            value={searchTerm}
            onChange={handleChangeSearch}
            onFocus={handleShowListProduct}
            ref={inputRef}
            placeholder='Enter product your search here ...'
          />
          {searchTerm.length > 0 &&
            (loading ? (
              <div className={cx("gg-spinner")}></div>
            ) : (
              <button
                className={cx("clear_btn")}
                onClick={handleRemoveSearchTearm}
              >
                <IconClose className={cx("icon")} />
              </button>
            ))}
          <IconSearch
            className={cx("search", searchTerm.length > 0 && "search-active")}
          />
        </div>
      </Tippy>
    </div>
  );
}
