import React, { useState, useEffect } from "react";
import Header from "./Navbar/Header";
import Axios from "axios";
import { SERVER_URL } from "../constants";

const Layout = ({ children }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    Axios.get(`${SERVER_URL}`/current-user``, {
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
