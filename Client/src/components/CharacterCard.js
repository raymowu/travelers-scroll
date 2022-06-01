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
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://preview.redd.it/9bcv6smhvx961.png?width=640&crop=smart&auto=webp&s=f5b7d40d216a89b1d8a4c77a41dff92a5431980b";
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
