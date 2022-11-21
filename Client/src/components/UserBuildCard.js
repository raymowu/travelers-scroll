import "../css/buildcard.css";
import Axios from "axios";
import deinitializeName from "./DeinitializeName";
import { FaThumbsUp, FaTrash } from "react-icons/fa";
import { decodeToken } from "react-jwt";
import { useState } from "react";
const CHARACTER_IMG_API = "https://api.genshin.dev/characters/";
const WEAPON_IMG_API = "https://api.genshin.dev/weapons/";
const ARTIFACT_IMG_API = "https://api.genshin.dev/artifacts/";

const UserBuildCard = ({ build }) => {
  const token = sessionStorage.getItem("token");
  // let username = token !== null ? decodeToken(token).username : "null";
  const [user, setUser] = useState("");
  const handleOnDelete = (e) => {
    e.preventDefault();
    if (token !== null){
      const { id } = decodeToken(token);
      if(id === build.Author.id){
        Axios(
          {
            method: "POST",
            data: {
              token: token,
            },
            withCredentials: true,
            url: `https://travelerscroll.herokuapp.com/builds/build/${build._id}/delete`,
          },
          { withCredentials: true }
        ).then((res) => {
          if (res.data.status === "ok") {
            alert("Build was deleted");
            window.location.href = `/profile/${res.data.user}`;
            setUser(res.data.user);
          } else if (res.data.status === "err") {
            alert(res.data.message);
          }
        });
      }
    }
    
  };
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
        
        {token && decodeToken(token).id === build.Author.id ? (
          <FaTrash className="delete-button" onClick={handleOnDelete}></FaTrash>
        ) : (
          <></>
        )}
      </div>
    </a>
  );
};

export default UserBuildCard;
