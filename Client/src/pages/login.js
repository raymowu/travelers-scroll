import { useState, useEffect } from "react";
import Axios from "axios";
import "../css/form.css";
import { gapi } from "gapi-script";
import { GoogleLogin } from "react-google-login";

function LogIn() {
  const [form, setForm] = useState({ username: "", password: "" });
  // const [cookie, setCookie] = useCookies(["token"]);

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

      url: "https://travelerscroll.herokuapp.com/glogin",
    }).then((res) => {
      if (res.data.status === "ok") {
        alert("Login was successful");
        sessionStorage.setItem("token", res.data.token);
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

  async function login(event) {
    event.preventDefault();
    Axios({
      method: "POST",
      data: {
        username: form.username,
        password: form.password,
      },
      withCredentials: true,

      url: "https://travelerscroll.herokuapp.com/login",
    }).then((res) => {
      if (res.data.status === "ok") {
        alert("Login was successful");
        sessionStorage.setItem("token", res.data.token);
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
          placeholder="Username"
          name="username"
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
            <span>Sign in with Google</span>
          </GoogleLogin>
        </div>
        <br />

        <p className="sign-up-text">
          Dont have an account? <a href="/register">Sign Up</a>
        </p>

        <a href="/forgotpassword">Forgot Password?</a>

        <a href="/">Back</a>
      </form>
    </div>
  );
}

export default LogIn;
