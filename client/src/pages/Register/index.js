import { useState } from "react";
import * as httpRequest from "~/utils/httpRequest";

import { Link } from "react-router-dom";

import classNames from "classnames/bind";
import style from "./Register.module.scss";

const cx = classNames.bind(style);

export default function Register() {
  const [user, setUser] = useState({ email: "", password: "", name: "" });

  const handleOnChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await httpRequest.post("user/register", { ...user });

      localStorage.setItem("userLogin", true);
      window.location.href = "/";
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  return (
    <div className={cx("wrapper")}>
      <form>
        <h2>Register</h2>
        <div className={cx("form-group")}>
          <p>
            Name<span>*</span>:
          </p>
          <input
            type='text'
            name='name'
            value={user.name}
            placeholder='Enter your name...'
            onChange={handleOnChangeInput}
            required
          />
        </div>

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
          Create account
        </button>
        <p>
          Already a member?{" "}
          <Link className={cx("primary-link")} to='/login'>
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
}
