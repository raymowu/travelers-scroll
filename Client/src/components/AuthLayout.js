import React, { useState, useEffect } from "react";
import Header from "./Navbar/Header";
import Axios from "axios";

const Layout = ({ children }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    Axios.get("https://travelerscroll.herokuapp.com/current-user", {
      withCredentials: true,
    }).then((response) => {
      // console.log(response.data.blogs)
      if (response.data.status === "ok") {
        setUser(response.data.user);
      }
      if (response.data.status === "err") {
        alert(response.data.message);
        window.location.href = "/login";
      }
    });
  }, []);

  return (
    <>
      <Header user={user} />
      <div>{children}</div>
    </>
  );
};

export default Layout;
