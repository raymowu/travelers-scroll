import "../css/characterheader.css";
import { AiFillStar } from "react-icons/ai";
const CHARACTER_API = "https://api.genshin.dev/characters/";
const CharacterHeader = ({ character, characterName }) => {
  return (
    <div className="container">
      <div
        className={`character-header ${characterName}`}
        style={{
          backgroundImage: `url(https://api.genshin.dev/characters/${characterName}/gacha-splash)`,
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
            <h2>{character.name}</h2>
          </li>
          <li>
            <h1>Creating Build</h1>
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
            <a href="#overview">Overview</a>
          </li>
          <li>
            <a href="#weapon">Weapon</a>
          </li>
          <li>
            <a href="#artifacts">Artifacts</a>
          </li>
          <li>
            <a href="#teams">Team</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CharacterHeader;
