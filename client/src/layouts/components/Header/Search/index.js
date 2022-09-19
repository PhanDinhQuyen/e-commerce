import { useState } from "react";

import style from "./Search.module.scss";
import classNames from "classnames/bind";

import { useDebounce } from "~/hooks";
import * as httpRequest from "~/utils/httpRequest";
import { IconSearch, IconClose } from "~/static/icons";
import { useEffect } from "react";

const cx = classNames.bind(style);

export default function Search() {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const debounceValue = useDebounce(searchTerm, 700);
  useEffect(() => {
    if (!debounceValue) return;
    setLoading(true);

    (async () => {
      try {
        const res = await httpRequest.get("/api/product", {
          params: {
            "lower_title[regex]": debounceValue,
          },
        });
        console.log(res);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        throw new Error(err);
      }
    })();
  }, [debounceValue]);
  const handleChangeSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  return (
    <div className={cx("wrapper")}>
      <input
        type='text'
        name='search'
        id='search'
        value={searchTerm}
        onChange={handleChangeSearch}
        placeholder='Enter product your search here ...'
      />
      {searchTerm.length > 0 &&
        (loading ? (
          <div className={cx("gg-spinner")}></div>
        ) : (
          <IconClose className={cx("icon")} />
        ))}
      <IconSearch />
    </div>
  );
}
