import { useState } from "react";
import Axios from "axios";
import "../css/form.css";

function ForgotPassword() {
  const [form, setForm] = useState({ username: "", password: "" });

  async function login(event) {
    event.preventDefault();
    Axios({
      method: "POST",
      data: {
        username: form.username,
        password: form.password,
      },
      withCredentials: true,
      url: "http://localhost:5000/login",
    }).then((res) => {
      if (res.data.status === "ok") {
        alert("Login was successful");
        window.location.href = "/";
      } else {
        alert("please check your username and password");
      }
    });
  }

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="app">
      <form onSubmit={login} className="form-container">
        <h1>Login</h1>
        <input
          type="text"
          placeholder="Email"
          name="username"
          className="input"
          onChange={handleChange}
        />
        <button type="submit" className="button-form">
          Submit
        </button>
        <br />
        <a href="/">Back</a>
      </form>
    </div>
  );
}

export default ForgotPassword;
