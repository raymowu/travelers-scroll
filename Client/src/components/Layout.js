import React from "react";
import Header from "./Navbar/Header";
import Axios from "axios"
import { useEffect, useState } from "react";

const Layout = ({ children }) => {

    const [user, setUser] = useState({})

    useEffect(() =>{
        Axios.get(`http://localhost:5000/current-user"`).then((response) => {
          console.log(response.data)
          // console.log(response.data.blogs)
          if (response.data.status === "ok"){
              setUser(response.data.user)
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