import { useState, useContext, useRef } from "react";
import { GlobalState } from "~/components/GlobalState";
import classNames from "classnames/bind";
import style from "./Category.module.scss";
import * as httpRequest from "~/utils/httpRequest";
import errorInfor from "~/utils/errorInfor";
import { toastError, toastSuccess } from "~/components/Toast";
import CategoryItem from "~/components/CategoryItem";

const cx = classNames.bind(style);
export default function Category() {
  const state = useContext(GlobalState);
  const [categories, setCategories] = state?.categories;
  const [callback, setCallback] = state?.callback;
  const [name, setName] = useState("");
  const [token] = state?.token;
  const inputRef = useRef();

  const createCategory = async () => {
    const _name = name.trim();
    if (!_name || name.length === 0) {
      toastError("Invalid name");
      return;
    }
    if (categories.filter((item) => item.name === _name).length > 0) {
      toastError("Name already in use");
      return;
    }
    try {
      await httpRequest.post(
        "/api/category",
        {
          name,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setCallback(!callback);
      setName("");
      inputRef.current.select();
    } catch (error) {
      toastError(error.message);
      errorInfor(error);
    }
  };

  const handleChangeName = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const hanleDelCategory = async (_id) => {
    try {
      await httpRequest.del(`/api/category/${_id}`, {
        headers: {
          Authorization: token,
        },
      });
      setCategories(categories.filter((category) => category._id !== _id));
    } catch (error) {
      toastError(error.message);
      errorInfor(error);
    }
  };
  const handleKeyPress = (e) => {
    e.preventDefault();
    if (e.key === "Enter") {
      createCategory();
    }
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("left")}>
        <input
          ref={inputRef}
          value={name}
          type='text'
          onKeyUp={handleKeyPress}
          onChange={handleChangeName}
          placeholder='Name category'
        />
        <button className={cx("upload")} onClick={createCategory}>
          Upload
        </button>
      </div>
      <div className={cx("right")}>
        {categories.map((item) => (
          <CategoryItem
            key={item._id}
            {...item}
            delCategory={hanleDelCategory}
          />
        ))}
      </div>
    </div>
  );
}
