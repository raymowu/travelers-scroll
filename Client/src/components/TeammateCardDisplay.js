import "../css/teammatecard.css";
import initializeName from "./InitializeName";
const CHARACTER_IMG_API = "https://api.genshin.dev/characters/";

const TeammateCardDisplay = ({ teammate }) => {
  return (
    <>
      <div className="team">
        <img src={CHARACTER_IMG_API + teammate + "/icon"} alt={teammate} />

        <h3>{initializeName(teammate.toString())}</h3>
      </div>
    </>
  );
};

export default TeammateCardDisplay;
