import { useState } from "react";
import { Link } from "react-router-dom";

import classNames from "classnames/bind";
import style from "./Register.module.scss";

import errorInfor from "~/utils/errorInfor";
import * as httpRequest from "~/utils/httpRequest";
import { toastError, toastSuccess } from "~/components/Toast";

const cx = classNames.bind(style);

export default function Register() {
  const [user, setUser] = useState({ email: "", password: "", name: "" });
  const [disabledSubmit, setDisabledSubmit] = useState(false);
  const emptyValue = {
    email: false,
    password: false,
    name: false,
  };

  const [isEmptyValue, setIsEmptyValue] = useState(emptyValue);
  const [loading, setLoading] = useState(false);
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setIsEmptyValue({
      email: false,
      password: false,
      name: false,
    });
    setUser({ ...user, [name]: value });
    setDisabledSubmit(false);
  };
  const handleOnSubmit = async (e) => {
    const valuesUser = Object.values(user);
    e.preventDefault();
    setLoading(true);
    setDisabledSubmit(true);
    if (!valuesUser.every((value) => Boolean(value))) {
      setLoading(false);
      for (let key in user) {
        emptyValue[key] = !Boolean(user[key]);
      }
      setIsEmptyValue(emptyValue);
      toastError("Please check your name, email or password!");
      return;
    }
    try {
      await httpRequest.post("user/register", { ...user });
      localStorage.setItem("userLogin", true);
      toastSuccess("User registered successfully");
      window.location.href = "/";
    } catch (error) {
      setLoading(false);
      toastError("Please check your name, email or password!");
      errorInfor(error);
    }
  };
  return (
    <div className={cx("wrapper")}>
      <Link className={cx("logo")} to='/'>
        Logo
      </Link>
      <form className={cx("form")} onSubmit={handleOnSubmit}>
        <h2 className={cx("form_title")}>Register</h2>
        <div
          className={cx("form_body", isEmptyValue.name && "form_body__notify")}
        >
          <label htmlFor='#name'>
            Name:{" "}
            {isEmptyValue.name && (
              <span className={cx("label_notify")}>Not empty</span>
            )}
          </label>
          <input
            type='text'
            name='name'
            value={user.name}
            onChange={handleOnChange}
            id='name'
            placeholder='Enter your name'
            autoFocus={true}
          />
        </div>
        <div
          className={cx("form_body", isEmptyValue.email && "form_body__notify")}
        >
          <label htmlFor='#email'>
            Email:{" "}
            {isEmptyValue.email && (
              <span className={cx("label_notify")}>Not empty</span>
            )}
          </label>
          <input
            type='email'
            name='email'
            value={user.email}
            onChange={handleOnChange}
            id='email'
            placeholder='Enter your email address'
          />
        </div>
        <div
          className={cx(
            "form_body",
            isEmptyValue.password && "form_body__notify"
          )}
        >
          <label htmlFor='password'>
            Password:{" "}
            {isEmptyValue.password && (
              <span className={cx("label_notify")}>Not empty</span>
            )}
          </label>
          <input
            type='password'
            name='password'
            value={user.password}
            onChange={handleOnChange}
            id='password'
            placeholder='Enter your password'
          />
        </div>
        <button disabled={disabledSubmit} className={cx("form_button")}>
          {!loading ? "Sign In" : <div className={cx("loading")}></div>}
        </button>
        <p>
          Already a member?{" "}
          <Link className={cx("link_primary")} to='/login'>
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
}
