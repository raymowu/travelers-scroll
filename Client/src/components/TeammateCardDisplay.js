import "../css/teammatecarddisplay.css";
import initializeName from "./InitializeName";
import { GENSHIN_API } from "../constants";

const CHARACTER_IMG_API = `${GENSHIN_API}/characters/`;

const TeammateCardDisplay = ({ teammate }) => {
  return (
    <a href={`/characters/${teammate}`}>
      <div className="team-display">
        <img
          src={CHARACTER_IMG_API + teammate + "/icon"}
          alt={teammate}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://preview.redd.it/9bcv6smhvx961.png?width=640&crop=smart&auto=webp&s=f5b7d40d216a89b1d8a4c77a41dff92a5431980b";
          }}
        />

        <h3>{initializeName(teammate.toString())}</h3>
      </div>
    </a>
  );
};

export default TeammateCardDisplay;
