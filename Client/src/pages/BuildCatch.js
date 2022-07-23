import React from "react";
import Layout from "../components/Layout";
import "../css/catch.css";

const BuildCatch = () => {
  return (
    <Layout Auth={false}>
      <div className="catch-container">
        <img src="https://i.imgur.com/clrhe3O.png" alt="klee"></img>
        <div className="break"></div>
        <h1>404</h1>
        <div className="break-inner-menu"></div>
        <h3>This Page Isn't Available</h3>
        <div className="break-inner-menu"></div>
        <p>
          This build may have been removed or the build you're trying to access doesn't
          exist. <a href="/">Go back to home</a>
        </p>{" "}
      </div>
    </Layout>
  );
};

export default BuildCatch;
