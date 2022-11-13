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
  const token = sessionStorage.getItem('token');
  let username = token !== null ? decodeToken(token).username : "null"
  const [user, setUser] = useState("");
  const handleOnDelete = (e) => {
    e.preventDefault();
    Axios(
      {
        method: "POST",
        data: {
          token: sessionStorage.getItem("token"),
        },
        withCredentials: true,
        url: `https://travelerscroll.herokuapp.com/builds/build/${build._id}/delete`,
      },
      { withCredentials: true }
    ).then((res) => {
      if (res.data.status === "ok") {
        alert("Build was deleted");
        window.location.href = `/profile/${res.data.user}`;
        setUser(res.data.user)
      } else if (res.data.status === "err") {
        alert(res.data.message);
      }
    });
  };
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
        { username === user ? <FaTrash className="delete-button" onClick={handleOnDelete}></FaTrash> : <></>}
      </div>
    </a>
  );
};

export default UserBuildCard;
