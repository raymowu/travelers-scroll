import "../css/characterheader.css";
import { AiFillStar } from "react-icons/ai";
import { GENSHIN_API } from "../constants";

const CHARACTER_API = `${GENSHIN_API}/characters/`;
const CharacterBuildHeader = ({ character, characterName, build }) => {
  return (
    <div className="container">
      <div
        className={`character-header ${characterName}`}
        style={{
          backgroundImage: `url(${GENSHIN_API}/characters/${characterName}/gacha-splash)`,
        }}
      >
        <div className="character-icon-container">
          <img src={CHARACTER_API + characterName + "/icon"}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `${CHARACTER_API}${characterName}/icon-big`;
          }}
          alt={characterName} />
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
            <h1>{build.title}</h1>
          </li>
          <li>
            <h2 className="author-build">
              {" "}
              by <span className="author-author">{build.Author.username}</span>
            </h2>
          </li>
          <li>
            <h2 className="date-date">{build.date}</h2>
          </li>
        </ul>
      </div>

      <div className="build-navbar">
        <ul>
          <li>
            <a href="#overview">Build Overview</a>
          </li>
          <li>
            <a href="#description">Description</a>
          </li>
          <li>
            <a href="#comments">Comments</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CharacterBuildHeader;
