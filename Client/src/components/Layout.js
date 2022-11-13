import React from "react";
import Header from "./Navbar/Header";

const Layout = ({ children, Auth = false }) => {
  // const [cookie, setCookie] = useCookies(["token"]);
  const exists = sessionStorage.getItem("token") !== null;
  if (!exists && Auth) {
    alert("Must be logged in");
    window.location.href = "/login";
  }
  return (
    <>
      <Header />
      {/* <Navbar /> */}
      <div>{children}</div>
    </>
  );
};

export default Layout;
