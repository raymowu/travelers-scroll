import { useState, useEffect } from "react";
import "../css/form.css";
import Axios from "axios";
import { gapi } from "gapi-script";
import { GoogleLogin } from "react-google-login";

function SignUp() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const ClientId =
    "807573379511-9us9tvqh79lupajoa0mnv91r2c6g2lml.apps.googleusercontent.com";

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: ClientId,
        scope: "",
      });
    }
    gapi.load("client:auth2", start);
  });
  const googleAuth = ({ profileObj }) => {
    const data = {
      gid: profileObj.googleId,
      email: profileObj.email,
    };
    Axios({
      method: "POST",
      data: data,
      withCredentials: true,

      url: "http://localhost:3000/gregister",

    }).then((res) => {
      if (res.data.status === "ok") {
        alert("Account has been successfully created!");
        window.location.href = "/";
      } else if (res.data.status === "err") {
        alert(res.data.message);
      }
    });
  };
  const failure = (error) => {
    console.log("err", error);
    console.log("failed");
  };

  async function register(event) {
    event.preventDefault();
    Axios({
      method: "POST",
      data: {
        username: form.username,
        email: form.email,
        password: form.password,
      },
      withCredentials: true,

      url: "http://localhost:3000/register",

    }).then((res) => {
      // const data = await response.json();

      if (res.data.status === "ok") {
        alert("Account has been successfully created!");
        window.location.href = "/";
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
      <form onSubmit={register} className="form-container">
        <h1>Create Account</h1>
        <input
          type="text"
          placeholder="Username"
          name="username"
          className="input"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          className="input"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          className="input"
          onChange={handleChange}
        />
        <button type="submit" className="button-form">
          Submit
        </button>
        <div>
          <GoogleLogin
            clientId={ClientId}
            onSuccess={googleAuth}
            onFailure={failure}
            cookiePolicy={"single_host_origin"}
            className="googlebtn"
          >
            <span>Sign Up with Google</span>
          </GoogleLogin>
        </div>
        <p className="already-have-an-account">
          Already have an account? <a href="/login">Login</a>
        </p>
        <a href="/">Back</a>
      </form>
    </div>
  );
}

export default SignUp;
