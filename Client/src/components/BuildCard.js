import "../css/buildcard.css";
import deinitializeName from "./DeinitializeName";
import { FaThumbsUp } from "react-icons/fa";
import { GENSHIN_API } from "../constants";

const CHARACTER_IMG_API = `${GENSHIN_API}/characters/`;
const WEAPON_IMG_API = `${GENSHIN_API}/weapons/`;
const ARTIFACT_IMG_API = `${GENSHIN_API}/artifacts/`;
const BuildCard = ({ build }) => {
  const weapon = build.weapons[0];
  const artifact = build.artifacts[0];
  return (
    <a href={`/build/${build._id}`}>
      <div className="build">
        <img
          className="buildcard-character-icon"
          src={CHARACTER_IMG_API + build.character + "/icon"}
          alt={build.character}
        />
        <div className="buildcard-info">
          <h2>{build.title} </h2>
          <h4 className="buildcard-username">
            by <span style={{ color: "#fdcc0d" }}>{build.Author.username} </span>
            on {build.date}
          </h4>

          <h4 className="buildcard-likes">
            <FaThumbsUp></FaThumbsUp> {build.likes}
          </h4>
        </div>
        <div className="buildcard-icons">
          <img
            className="buildcard-weapon-icon"
            src={WEAPON_IMG_API + deinitializeName(weapon.name) + "/icon"}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://i.imgur.com/4Ee24al.png";
            }}
            alt={weapon.name}
            style={{
              backgroundImage:
                weapon.rarity === 1
                  ? "url('https://i.imgur.com/l36Qgzw.png')"
                  : weapon.rarity === 2
                  ? "url('https://i.imgur.com/8RBtke0.png')"
                  : weapon.rarity === 3
                  ? "url('https://i.imgur.com/QD9BEvl.png')"
                  : weapon.rarity === 4
                  ? "url('https://i.imgur.com/sg3xxcl.png')"
                  : "url('https://i.imgur.com/66bWnNJ.png')",
            }}
          />
          <img
            className="buildcard-artifacts-icon"
            src={ARTIFACT_IMG_API + deinitializeName(artifact.name) + "/circlet-of-logos"}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://i.imgur.com/4Ee24al.png";
            }}
            alt={artifact.name}
            style={{
              backgroundImage:
                artifact.max_rarity === 1
                  ? "url('https://i.imgur.com/l36Qgzw.png')"
                  : artifact.max_rarity === 2
                  ? "url('https://i.imgur.com/8RBtke0.png')"
                  : artifact.max_rarity === 3
                  ? "url('https://i.imgur.com/QD9BEvl.png')"
                  : artifact.max_rarity === 4
                  ? "url('https://i.imgur.com/sg3xxcl.png')"
                  : "url('https://i.imgur.com/66bWnNJ.png')",
            }}
          />
        </div>
      </div>
    </a>
  );
};

export default BuildCard;
