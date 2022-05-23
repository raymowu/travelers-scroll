import "../css/characterheader.css";
import { AiFillStar } from "react-icons/ai";
import LikeButton from "./LikeButton";
const CHARACTER_API = "https://api.genshin.dev/characters/";
const ProfileHeader = ({ user }) => {
  return (
    <div className="container">
      <div
        className={`character-header ${user.name}`}
        style={{
          backgroundImage: `url(https://api.genshin.dev/characters/hu-tao/gacha-splash)`,
        }}
      >
        <div className="character-icon-container">
          <img src={CHARACTER_API + "hu-tao" + "/icon"} />
        </div>
        <ul>
          <li>
            <h2>Genshin Impact</h2>
          </li>
          <li>
            <h1>{user.username}</h1>
          </li>
          <li>
            <h2 className="author-build">
              {" "}
              by <span className="author-author">{user.username}</span>
            </h2>
          </li>
          <li>
            <h2 className="profile-date">{user.username}</h2>
          </li>
        </ul>
      </div>

      <div className="profile-navbar">
        <ul>
          <li>
            <a href="#description">Overview</a>
          </li>
          <li>
            <a href="#weapon">Stats</a>
          </li>
          <li>
            <a href="#artifacts">Builds</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileHeader;
