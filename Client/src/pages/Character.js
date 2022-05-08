import React from "react";
import "../css/character.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import BuildCard from "../components/BuildCard";
import CharacterInfoHeader from "../components/CharacterInfoHeader";
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
        console.log(data.builds);
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
  return (
    <Layout>
      <CharacterInfoHeader character={character} characterName={characterName} />
      <div className="container2">
        <h3>{character.description}</h3>
        <div className="break"></div>
        <h1 className="recent-builds">Recent {character.name} Builds:</h1>
        <div className="break"></div>
        <button type="button" className="button-18" onClick={handleOnCreateBuild}>
          Create {`${character.name}`} Build
        </button>
        <div className="build-container">
          {builds.length > 0 &&
            builds.map((build) => {
              return (
                <>
                  <BuildCard key={build._id} build={build} />
                  <div className="break"></div>
                </>
              );
            })}
        </div>
      </div>
    </Layout>
  );
};

export default Character;
