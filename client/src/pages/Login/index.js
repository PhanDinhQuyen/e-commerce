import { useState } from "react";
import { Link } from "react-router-dom";

import classNames from "classnames/bind";
import style from "./Login.module.scss";

import * as httpRequest from "~/utils/httpRequest";
import errorInfor from "~/utils/errorInfor";

import Toast from "~/components/Toast";

const cx = classNames.bind(style);

export default function Login() {
  const [user, setUser] = useState({ email: "", password: "" });
  const [disabledSubmit, setDisabledSubmit] = useState(false);
  const toast = {
    title: "Check your  email or password",
    type: "error",
  };
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
      for (const key in user) {
        emptyValue[key] = !Boolean(user[key]);
      }
      setIsEmptyValue(emptyValue);
      return;
    }
    (async () => {
      try {
        await httpRequest.post("user/login", { ...user });
        localStorage.setItem("userLogin", true);
        window.location.href = "/";
      } catch (error) {
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
            type='email'
            name='email'
            value={user.email}
            onChange={handleOnChange}
            onFocus={handleOnFocus}
            id='email'
            placeholder='Enter your email address'
            autoFocus={true}
            // required
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
            onFocus={handleOnFocus}
            id='password'
            placeholder='Enter your password'
            // required
          />
        </div>
        <Toast
          className={cx("form_button")}
          type={toast.type}
          title={toast.title}
          typeBtn='submit'
          disabled={disabledSubmit}
        >
          {!loading ? "Sign In" : <div className={cx("loading")}></div>}
        </Toast>
        <p>
          Not a member?{" "}
          <Link className={cx("link_primary")} to='/register'>
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
