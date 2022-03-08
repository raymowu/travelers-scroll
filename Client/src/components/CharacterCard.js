import React from "react";
import "../css/home.css";
import initializeName from "./InitializeName";
const CHARACTER_API = "https://api.genshin.dev/characters/";

const CharacterCard = ({ characterName }) => {
  return (
    <>
      <div className="character">
        <a href={`/characters/${characterName}`}>
          <img
            src={CHARACTER_API + characterName + "/icon"}
            alt={characterName}
          />
        </a>
        <h3>{initializeName(characterName)}</h3>
      </div>
    </>
  );
};

export default CharacterCard;
