import { useState } from "react";
import * as httpRequest from "~/utils/httpRequest";

import { Link } from "react-router-dom";

import classNames from "classnames/bind";

import style from "./Login.module.scss";

const cx = classNames.bind(style);

export default function Login() {
  const [user, setUser] = useState({ email: "", password: "" });

  const handleOnChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await httpRequest.post("/user/login", { ...user });

      localStorage.setItem("userLogin", true);

      window.location.href = "/";
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  return (
    <div className={cx("wrapper")}>
      <form>
        <h2>Login</h2>
        <div className={cx("form-group")}>
          <p>
            Email<span>*</span>:
          </p>
          <input
            type='email'
            name='email'
            value={user.email}
            placeholder='Enter your email address...'
            onChange={handleOnChangeInput}
            required
          />
        </div>
        <div className={cx("form-group")}>
          <p>
            Password<span>*</span>:
          </p>
          <input
            type='password'
            name='password'
            placeholder='Enter your password...'
            value={user.password}
            onChange={handleOnChangeInput}
            autoComplete='current-password'
            required
          />
        </div>

        <button className={cx("submit-btn")} onClick={handleSubmit}>
          Submit
        </button>
        <p>
          Not a member?{" "}
          <Link className={cx("primary-link")} to='/register'>
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
