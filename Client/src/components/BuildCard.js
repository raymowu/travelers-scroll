import "../css/buildcard.css";
import deinitializeName from "./DeinitializeName";
const CHARACTER_IMG_API = "https://api.genshin.dev/characters/";
const WEAPON_IMG_API = "https://api.genshin.dev/weapons/";
const ARTIFACT_IMG_API = "https://api.genshin.dev/artifacts/";
const BuildCard = ({ build }) => {
  return (
    <a href={`/build/${build._id}`}>
      <div className="build">
        <div className="buildcard-info">
          <h2>{build.title} </h2>
          <h4 className="buildcard-username">by {build.Author.username}</h4>
          <h4 className="buildcard-likes">{build.likes} likes • </h4>
        </div>
        <div className="buildcard-icons">
          <img
            src={CHARACTER_IMG_API + build.character + "/icon"}
            alt={build.character}
          />
          <img
            className="buildcard-weapon-icon"
            src={WEAPON_IMG_API + deinitializeName(build.weapons[0].name) + "/icon"}
            alt={build.weapons[0].name}
          />
          <img
            className="buildcard-artifacts-icon"
            src={
              ARTIFACT_IMG_API +
              deinitializeName(build.artifacts[0].name) +
              "/circlet-of-logos"
            }
            alt={build.weapons[0].name}
          />
        </div>
      </div>
    </a>
  );
};

export default BuildCard;
