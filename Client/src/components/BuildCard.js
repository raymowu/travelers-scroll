import "../css/buildcard.css";
import deinitializeName from "./DeinitializeName";
const CHARACTER_IMG_API = "https://api.genshin.dev/characters/";
const WEAPON_IMG_API = "https://api.genshin.dev/weapons/";

const BuildCard = ({ build }) => {
  console.log(build.weapons[0].name);
  return (
    <a href={`/build/${build._id}`}>
      <div className="build">
        <h2>{build.title}</h2>

        <img src={CHARACTER_IMG_API + build.character + "/icon"} alt={build.character} />
        <img
          src={WEAPON_IMG_API + deinitializeName(build.weapons[0].name) + "/icon"}
          alt={build.weapons[0].name}
        />
      </div>
    </a>
  );
};

export default BuildCard;
