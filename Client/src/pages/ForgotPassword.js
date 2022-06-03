import { useState } from "react";
import Axios from "axios";
import "../css/form.css";

function ForgotPassword() {
  const [form, setForm] = useState({ email: "" });

  async function forgotpassword(event) {
    event.preventDefault();
    Axios({
      method: "POST",
      data: {
        email: form.email
      },
      withCredentials: true,
      url: "http://localhost:5000/forgotpassword",
    }).then((res) => {
      if (res.data.status === "ok") {
        alert("Link was sent to your email");
        window.location.href = "/";
      } else {
        alert("something went wrong, please wait while the devs create more error handling");
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
      <form onSubmit={forgotpassword} className="form-container">
        <h1>Forgot Password</h1>
        <input
          type="email"
          placeholder="Email"
          name="email"
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
