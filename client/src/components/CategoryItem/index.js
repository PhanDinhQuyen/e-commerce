import { useRef, useState, useEffect, useContext } from "react";
import { GlobalState } from "../GlobalState";
import { toastError } from "../Toast";
import style from "./CategoryItem.module.scss";
import classNames from "classnames/bind";
import { CgPen, CgTrashEmpty } from "react-icons/cg";
import { CiSaveUp2 } from "react-icons/ci";

const cx = classNames.bind(style);

export default function CategoryItem({ name, _id, delCategory, editCategory }) {
  const [value, setValue] = useState(name);
  const [disabled, setDisabled] = useState(true);
  const inputRef = useRef();
  const divRef = useRef();
  const state = useContext(GlobalState);
  const [categories] = state.categories;
  const [callback, setCallback] = state.callback;
  const handleEdit = () => {
    setDisabled(false);
  };
  const handleSave = async () => {
    const _name = value.trim();
    if (!_name || _name.length === 0) {
      setValue(name);
      setDisabled(true);
      toastError("Name is required");
      inputRef.current.focus();
      return;
    }
    if (_name === name) {
      setValue(value);
      setDisabled(true);
      return;
    }
    if (categories.filter((item) => item.name === _name).length > 0) {
      toastError("Name already in use");
      setValue(name);
      setDisabled(true);
      return;
    }

    setValue(value);
    setDisabled(true);

    await editCategory(_name, _id);
    setCallback(!callback);
  };
  const handleChangeValue = (e) => {
    e.preventDefault();
    setValue(e.target.value);
  };
  const handleKeyPress = (e) => {
    e.preventDefault();
    if (e.key === "Enter") {
      handleSave();
    }
  };

  useEffect(() => {
    if (!disabled) {
      inputRef.current.focus();
    }
  }, [disabled]);
  return (
    <div ref={divRef} className={cx("wrapper")}>
      <input
        id={_id}
        type='text'
        onChange={handleChangeValue}
        value={value}
        ref={inputRef}
        disabled={disabled}
        onKeyUp={handleKeyPress}
        className={cx(!disabled && "input_focus")}
        data-name={value}
      />
      <button
        className={cx("edit")}
        onClick={disabled ? handleEdit : handleSave}
      >
        {disabled ? <CgPen /> : <CiSaveUp2 />}
      </button>
      <button className={cx("trash")} onClick={() => delCategory(_id)}>
        <CgTrashEmpty />
      </button>
    </div>
  );
}
