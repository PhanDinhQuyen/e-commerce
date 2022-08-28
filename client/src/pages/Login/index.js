import { useState } from "react";
import * as httpRequest from "~/utils/httpRequest";
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
    <form>
      <h2>Login</h2>
      <label>
        Email:
        <input
          type='text'
          name='email'
          value={user.email}
          onChange={handleOnChangeInput}
          required
        />
      </label>
      <label>
        Password:
        <input
          type='text'
          name='password'
          value={user.password}
          onChange={handleOnChangeInput}
          required
        />
      </label>
      <button onClick={handleSubmit}>Submit</button>
    </form>
  );
}
