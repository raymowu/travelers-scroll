import React from "react";
import "../css/teammatecard.css";
import initializeName from "./InitializeName";
import { GENSHIN_API } from "../constants";

const CHARACTER_IMG_API = `${GENSHIN_API}/characters/`;

const TeammateCard = ({ teammate, teamHandleOnClick }) => {
  return (
    <>
      <div className="team">
        <img
          src={CHARACTER_IMG_API + teammate + "/icon"}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://preview.redd.it/9bcv6smhvx961.png?width=640&crop=smart&auto=webp&s=f5b7d40d216a89b1d8a4c77a41dff92a5431980b";
          }}
          onClick={() => teamHandleOnClick(teammate)}
          alt={teammate}
        />

        <h3>{initializeName(teammate)}</h3>
      </div>
    </>
  );
};

export default TeammateCard;
