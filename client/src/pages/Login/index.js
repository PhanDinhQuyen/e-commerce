import { useState } from "react";
import { Link } from "react-router-dom";

import style from "./Login.module.scss";
import classNames from "classnames/bind";

import errorInfor from "~/utils/errorInfor";
import * as httpRequest from "~/utils/httpRequest";

import { toastError, toastSuccess } from "~/components/Toast";

const cx = classNames.bind(style);

export default function Login() {
  const [user, setUser] = useState({ email: "", password: "" });
  const [disabledSubmit, setDisabledSubmit] = useState(false);
  const emptyValue = {
    email: false,
    password: false,
  };

  const [isEmptyValue, setIsEmptyValue] = useState(emptyValue);
  const [loading, setLoading] = useState(false);
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setIsEmptyValue({
      email: false,
      password: false,
    });
    setUser({ ...user, [name]: value });
    setDisabledSubmit(false);
  };
  const handleClickInput = () => {
    setDisabledSubmit(false);
  };
  const handleOnFocus = (e) => {
    e.preventDefault();
    e.target.select();
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setDisabledSubmit(true);
    const valuesUser = Object.values(user);
    if (!valuesUser.every((value) => Boolean(value))) {
      setLoading(false);
      toastError("Check your email or password!");
      for (const key in user) {
        emptyValue[key] = !Boolean(user[key]);
      }
      console.log(emptyValue);
      setIsEmptyValue(emptyValue);
      return;
    }
    (async () => {
      try {
        await httpRequest.post("user/login", { ...user });
        localStorage.setItem("userLogin", true);
        toastSuccess("User logged in successfully");
        setTimeout(() => (window.location.href = "/"), 2000);
      } catch (error) {
        toastError("Check your email and password!");
        // setIsEmptyValue({
        //   email: true,
        //   password: true,
        // });
        setLoading(false);
        errorInfor(error);
      }
    })();
  };
  return (
    <div className={cx("wrapper")}>
      <Link className={cx("logo")} to='/'>
        Logo
      </Link>
      <form className={cx("form")} onSubmit={handleOnSubmit}>
        <h2 className={cx("form_title")}>Login</h2>
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
            onClick={handleClickInput}
            type='email'
            name='email'
            value={user.email}
            onChange={handleOnChange}
            onFocus={handleOnFocus}
            id='email'
            placeholder='Enter your email address'
            autoFocus={true}
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
            onClick={handleClickInput}
            type='password'
            name='password'
            value={user.password}
            onChange={handleOnChange}
            onFocus={handleOnFocus}
            id='password'
            placeholder='Enter your password'
            // required
          />
        </div>

        <button
          className={cx("form_button")}
          type='submit'
          disabled={disabledSubmit}
        >
          {!loading ? "Sign In" : <div className={cx("loading")}></div>}
        </button>
        <p>
          Not a member?
          <Link className={cx("link_primary")} to='/register'>
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
