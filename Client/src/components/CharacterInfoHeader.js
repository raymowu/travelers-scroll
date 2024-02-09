import "../css/characterheader.css";
import { AiFillStar } from "react-icons/ai";
import { GENSHIN_API } from "../constants";

const CHARACTER_API = `${GENSHIN_API}/characters/`;
const CharacterInfoHeader = ({ character, characterName }) => {
  return (
    <div className="container">
      <div
        className={`character-header ${characterName}`}
        style={{
          backgroundImage: `url(${GENSHIN_API}/characters/${characterName}/gacha-splash)`,
        }}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://i.imgur.com/4Ee24al.png";
        }}
      >
        <div className="character-icon-container">
          <img src={CHARACTER_API + characterName + "/icon"} alt={characterName} />
          <div className="star-container">
            {Array.from(Array(character.rarity), (e, i) => {
              return <AiFillStar key={i} size={20} className="fill-star" />;
            })}
          </div>
        </div>
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
            <a href="#description">Description</a>
          </li>
          <li>
            <a href="#talents">Talents</a>
          </li>
          <li>
            <a href="#passives">Passives</a>
          </li>
          <li>
            <a href="#constellations">Constellations</a>
          </li>
          <li>
            <a href="#showcase">Showcase</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CharacterInfoHeader;
