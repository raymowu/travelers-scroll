import React from "react";
import Header from "./Navbar/Header";

const Layout = ({ children }) => {
    return (
        <>
            <Header />
            <div>{children}</div>
        </>
    );
};

export default Layout;