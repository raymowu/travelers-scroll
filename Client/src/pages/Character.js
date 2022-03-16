import React from "react";
import "../css/character.css";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import BuildCard from "../components/BuildCard";
import { Button } from "react-bootstrap";
const CHARACTER_API = "https://api.genshin.dev/characters/";
const Character = () => {
  const navigate = useNavigate();
  //characterName is un capitalized, character.name is capitalized
  const [character, setCharacter] = useState([]);
  const [builds, setBuilds] = useState([]);
  //fetches character w unique character api
  const getCharacter = (characterName) => {
    fetch(CHARACTER_API + characterName)
      .then((res) => res.json())
      .then((data) => {
        setCharacter(data);
      });
  };
  const getBuilds = () => {
    fetch(`http://localhost:5000/builds/${characterName}`)
      .then((res) => res.json())
      .then((data) => {
        setBuilds(data.builds);
      });
  };

  let { characterName } = useParams();

  useEffect(() => {
    getCharacter(characterName);
    getBuilds();
  }, []);

  const handleOnCreateBuild = (e) => {
    navigate(`/createbuild/${characterName}`);
  };

  console.log(builds);
  return (
    <Layout>
      <div className="container">
        <div
          className={`character-header ${characterName}`}
          style={{
            backgroundImage: `url(https://api.genshin.dev/characters/${characterName}/gacha-splash)`,
          }}
        >
          <img src={CHARACTER_API + characterName + "/icon"} alt={characterName} />
          <ul>
            <li>
              <h2>Genshin Impact</h2>
            </li>
            <li>
              <h1>{character.name}</h1>
            </li>
            <li>
              <h2>
                {" "}
                <span className={`${character.vision}`}>
                  {character.vision}
                </span> &#x2022; {character.weapon}
              </h2>
            </li>
          </ul>
        </div>

        <div className="character-navbar">
          <ul>
            <li>
              <a href="#">Description</a>
            </li>
            <li>
              <a href="#">Weapon</a>
            </li>
            <li>
              <a href="#">Artifacts</a>
            </li>
            <li>
              <a href="#">Teams</a>
            </li>
            <li>
              <a href="#">Showcase</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="container2">
        <h3>{character.description}</h3>
        <div className="break"></div>
        <button type="button" className="button-18" onClick={handleOnCreateBuild}>
          Create {`${character.name}`} Build
        </button>
        <h1 className="recent-builds">Recent Builds For {character.name}:</h1>
        <div className="break"></div>
        <div className="build-container">
          {builds.length > 0 &&
            builds.map((build) => {
              return <BuildCard key={build._id} build={build} />;
            })}
        </div>
      </div>
    </Layout>
  );
};

export default Character;
