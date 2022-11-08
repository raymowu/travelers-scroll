import React from "react";
import Header from "./Navbar/Header";
import Axios from "axios";
import { useEffect, useState } from "react";

const Layout = ({ children, Auth = false }) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    Axios.get("https://travelerscroll.herokuapp.com/current-user", {
      withCredentials: true,
    }).then((response) => {
      if (response.data.status === "ok") {
        setUser(response.data.user);
      }
      if (response.data.status === "err" && Auth) {
        alert(response.data.message);
        window.location.href = "/login";
      }
    });
  }, [Auth]);

  return (
    <>
      <Header user={user} />
      {/* <Navbar /> */}
      <div>{children}</div>
    </>
  );
};

export default Layout;
