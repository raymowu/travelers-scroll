import React from "react";
import "../css/teammatecard.css";
import initializeName from "./InitializeName";
const CHARACTER_IMG_API = "https://api.genshin.dev/characters/";

const TeammateCard = ({ teammate, teamHandleOnClick }) => {
  return (
    <>
      <div className="team">
        <img
          src={CHARACTER_IMG_API + teammate + "/icon"}
          onClick={() => teamHandleOnClick(teammate)}
          alt={teammate}
        />

        <h3>{initializeName(teammate)}</h3>
      </div>
    </>
  );
};

export default TeammateCard;
