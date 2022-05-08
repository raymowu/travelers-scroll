import "../css/teammatecarddisplay.css";
import initializeName from "./InitializeName";
const CHARACTER_IMG_API = "https://api.genshin.dev/characters/";

const TeammateCardDisplay = ({ teammate }) => {
  return (
    <a href={`/characters/${teammate}`}>
      <div className="team-display">
        <img src={CHARACTER_IMG_API + teammate + "/icon"} alt={teammate} />

        <h3>{initializeName(teammate.toString())}</h3>
      </div>
    </a>
  );
};

export default TeammateCardDisplay;
