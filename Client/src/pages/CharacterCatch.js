import React from "react";
import Layout from "../components/Layout";
import "../css/catch.css";

const CharacterCatch = () => {
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
          The character you are trying to access doesn't exist. Please make sure the link
          you're trying to open is correct. <a href="/">Go back to home</a>
        </p>{" "}
      </div>
    </Layout>
  );
};

export default CharacterCatch;
