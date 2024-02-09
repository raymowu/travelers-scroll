import React from "react";
import "../css/home.css";
import initializeName from "./InitializeName";
import { GENSHIN_API } from "../constants";

const CHARACTER_API = `${GENSHIN_API}/characters/`;

const CharacterCard = ({ characterName }) => {
  return (
    <>
      <div className="character">
        <a href={`/characters/${characterName}`}>
          <img
            src={CHARACTER_API + characterName + "/icon"}
            // onError={(e) => {
            //   e.target.onerror = null;
            //   e.target.src = "https://i.imgur.com/4Ee24al.png";
            // }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `${CHARACTER_API}${characterName}` + "/icon-big";
            }}
            alt={characterName}
          />
        </a>
        <h3>{initializeName(characterName)}</h3>
      </div>
    </>
  );
};

export default CharacterCard;
