import React, { useEffect, useState } from "react";
import "../css/home.css";
import CharacterCard from "../components/CharacterCard";
import Axios from "axios";
import Layout from "../components/Layout";
import initializeName from "../components/InitializeName";

const CHARACTER_API = "https://api.genshin.dev/characters/";

function Home() {
  const [characters, setCharacters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getCharacters(CHARACTER_API);
  }, []);

  //fetches characters w character api
  const getCharacters = (API) => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        setCharacters(data);
      });
  };

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
  };

  console.log(characters);
  return (
    <Layout>
      <div className="character-container">
        <form onSubmit={handleOnSubmit}>
          <input
            className="search-bar"
            type="search"
            placeholder="Search for a character..."
            value={searchTerm}
            onChange={handleOnChange}
          />
        </form>
        <div className="break"></div>
        {characters.length > 0 &&
          characters
            .filter((characterName) => {
              if (searchTerm === "") {
                return characterName;
              } else if (
                initializeName(characterName)
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
              ) {
                return characterName;
              }
              return false;
            })
            .map((characterName) => {
              return <CharacterCard characterName={characterName} />;
            })}
      </div>
    </Layout>
  );
}

export default Home;
