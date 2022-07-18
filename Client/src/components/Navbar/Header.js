// import { useState } from "react"

import { Axios } from "axios";
import classes from "../../css/navbar.module.css";

function Header({ user }) {
  const links = [
    { id: 0, name: "Builds", link: "#", className: `${classes.link}` },
    { id: 1, name: "Log In", link: "/login", className: `${classes.link}` },
    { id: 2, name: "Sign Up", link: "/register", className: `${classes.signup}` },
  ];

  if (!user) {
    console.log("no user logged in");
  } else {
    console.log("there is a user logged in");
  }
  const Logout = () => {
    Axios.get("http://localhost:5000/logout", { withCredentials: true }).then((res) => {
      if (res.data.status === "ok") {
        alert("Successfully logged out");
      } else {
        alert("something went wrong");
      }
    });
  };

  return (
    <header>
      <div className={classes.logo}>
        <h2>
          <a href="/">The Traveler's Scroll</a>
        </h2>
      </div>
      <div>
        <ul className={`${classes.items}`}>
          {user.id ? (
            <>
              <li>
                <a href={`/profile/${user.username}`}>{user.username}</a>
              </li>
            </>
          ) : (
            <>
              <li>
                <a href="/login" className={classes.link}>
                  log in
                </a>
              </li>
              <li>
                <a href="/register" className={classes.signup}>
                  sign up
                </a>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
}

export default Header;
