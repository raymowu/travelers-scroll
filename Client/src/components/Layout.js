import React from "react";
import Header from "./Navbar/Header";
import Axios from "axios";
import { useEffect, useState } from "react";
import { decodeToken } from "react-jwt"
import {useCookies} from "react-cookie"

const Layout = ({ children, Auth = false }) => {

  const [user, setUser] = useState({});
  const [cookie, setCookie] = useCookies(['token']);
  // if(localStorage.getItem("token") === null){
  //   setCookie("token", null);
  // }
  // setCookie("name", "token");
  // setCookie("token", "token");
  // if (localStorage.getItem("token") === null){
  //   localStorage.setItem("token", null)
  // }
  // else{
  //   const token = decodeToken(localStorage.getItem("token"))
  //   setUser(token.username)
  // }
  const exists = (localStorage.getItem('token') !== null);
  if (!exists && Auth) {
    alert("Must be logged in");
    window.location.href = "/login";
  }
  
  // if(exists){
  //   const token = localStorage.getItem('token');
  //   const value = decodeToken(token)
  //   console.log(value)
  //   setUser(value)
  // }
  // console.log(token)
  // const token = localStorage.getItem('token');
  // const user = decodeToken(token)
  // setUser()
  // useEffect(() => {
  //   Axios.get("http://localhost:3000/current-user", {
  //     withCredentials: true,
  //   }).then((response) => {
  //     console.log(response.data)
  //   });
  // }, [Auth]);

  return (
    <>
      <Header user={user} />
      {/* <Navbar /> */}
      <div>{children}</div>
    </>
  );
};

export default Layout;
