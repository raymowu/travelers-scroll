import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CharacterBuildHeader from "../components/CharacterBuildHeader";
import Layout from "../components/Layout";
import "../css/buildpage.css";
import WeaponCardDisplay from "../components/WeaponCardDisplay";
import ArtifactCardDisplay from "../components/ArtifactCardDisplay";
import TeammateCardDisplay from "../components/TeammateCardDisplay";
import Comment from "../components/Comment";
import Axios from "axios";
import LikeButton from "../components/LikeButton";
import ReactTooltip from "react-tooltip";

const CHARACTER_API = "https://api.genshin.dev/characters/";

const Build = () => {
  const [build, setBuild] = useState({
    Author: {},
    _id: 0,
    title: "",
    character: "",
    weapons: [],
    artifacts: [],
    teams: [],
    Comment: [],
    likes: 0,
    LikedUsers: [],
    __v: 0,
  });
  const [characterName, setCharacterName] = useState("");
  const [character, setCharacter] = useState([]);
  const [comment, setComment] = useState("");
  const [user, setUser] = useState("");

  const getBuild = (buildid) => {
    fetch(`http://localhost:5000/builds/build/${buildid}`)
      .then((res) => res.json())
      .then((data) => {
        setBuild(data.build);
        setCharacterName(data.build.character);
        getCharacter(data.build.character);
      });
  };

  const getUser = () => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: `http://localhost:5000/builds/build/${buildid}`,
    }).then((res) => {
      if (res.data.status === "err") {
        alert("err");
      }
      setUser(res.data.userId);
      console.log(res.data.userId);
    });
  };

  const getCharacter = (characterName) => {
    fetch(CHARACTER_API + characterName)
      .then((res) => res.json())
      .then((data) => {
        setCharacter(data);
      });
  };

  let { buildid } = useParams();

  useEffect(() => {
    getBuild(buildid);
    getUser();
  }, []);

  const resetHandler = () => {
    setComment("");
  };

  const handleOnCommentSubmit = (e) => {
    if (!comment) {
      e.preventDefault();
      alert("Please enter a comment!");
    } else {
      Axios({
        method: "POST",
        data: {
          text: comment,
        },
        withCredentials: true,
        url: `http://localhost:5000/builds/build/${buildid}/newComment`,
      }).then((res) => {
        if (res.data.status === "err") {
          alert("YOUR BAD");
        }
      });
      resetHandler();
    }
    window.location.reload(false);
  };

  const handleOnLike = () => {
    if (build.LikedUsers.includes(user)) {
      Axios({
        method: "POST",
        data: {
          liked: false,
        },
        withCredentials: true,
        url: `http://localhost:5000/builds/build/${buildid}/liked`,
      }).then((res) => {
        if (res.data.status === "err") {
          alert(res.data.message);
        }
      });
    } else {
      Axios({
        method: "POST",
        data: {
          liked: true,
        },
        withCredentials: true,
        url: `http://localhost:5000/builds/build/${buildid}/liked`,
      }).then((res) => {
        if (res.data.status === "err") {
          alert(res.data.message);
        }
      });
    }
    window.location.reload(false);
  };

  return (
    <Layout>
      <CharacterBuildHeader
        characterName={characterName}
        character={character}
        build={build}
      />

      <div className="buildpage-container">
        <LikeButton
          className="like-button"
          liked={build.LikedUsers.includes(user)}
          handleOnLike={handleOnLike}
        />
        <h2 className="like-count">{build.likes}</h2>
        <div id="weapon" className="break"></div>
        <div className="break"></div>
        <div className="weapon-container">
          <span className="vert-bar">&#10072;</span> <h2>Weapons</h2>{" "}
          <h2 className="weapon-gr">Best in-slot weapons for {character.name}</h2>
          <div className="break-inner-menu"></div>
          {build.weapons.map((weapon) => {
            return (
              <div
                data-html="true"
                data-tip={`<span style="color: #216CE4; font-size: 16px">${weapon.name}</span> 
                <br /> <span style="font-size: 11px">${weapon.type}</span>
                <br /> 
                <br /> ${weapon.subStat}
                <br /> ${weapon.baseAttack} Base Attack
                <br /> &#8226;  ${weapon.passiveName}: ${weapon.passiveDesc}
                <br /> 
                <br />  <span style="color: #d1b132">${weapon.rarity} Star Weapon</span>
                <br /> 
                `}
                data-effect="solid"
                data-offset="{'top': -10}"
                data-border="true"
                data-border-color="#1e143a"
              >
                <ReactTooltip className="tooltip" />
                <WeaponCardDisplay weapon={weapon} />
              </div>
            );
          })}
        </div>
        <div id="artifacts"></div>
        <div className="artifact-container">
          <span className="vert-bar">&#10072;</span> <h2>Artifacts</h2>{" "}
          <h2 className="artifact-gr">Best in-slot artifact sets for {character.name}</h2>
          <div className="break-inner-menu"></div>
          {build.artifacts.map((artifact) => {
            return (
              <div
                data-html="true"
                data-tip={`<span style="color: #216CE4; font-size: 16px">${artifact.name}</span> 
                <br /> 
                <br /> 2-Piece Set: ${artifact["2-piece_bonus"]}
                <br /> 4-Piece Set: ${artifact["4-piece_bonus"]}
                <br /> &#8226;  ${artifact.passiveName}: ${artifact.passiveDesc}
                <br /> 
                <br />  <span style="color: #d1b132">Max ${artifact.max_rarity} Star Artifact</span>
                <br /> 
                `}
                data-effect="solid"
                data-offset="{'top': -10}"
                data-border="true"
                data-border-color="#1e143a"
              >
                <ReactTooltip className="tooltip" />
                <ArtifactCardDisplay artifact={artifact} />
              </div>
            );
          })}
        </div>
        <div id="teams"></div>
        <div className="break"></div>
        <div className="team-container">
          <span className="vert-bar">&#10072;</span> <h2>Team</h2>{" "}
          <h2 className="team-gr">Best teammates with {character.name}</h2>
          <div className="break-inner-menu"></div>
          {build.teams.map((teammate) => {
            return <TeammateCardDisplay teammate={teammate} />;
          })}
        </div>
        <div className="break"></div>
        <div className="break"></div>
        <div className="comment-container">
          <div className="create-comment">
            <label>
              <textarea
                className="create-comment-text"
                value={comment}
                placeholder="Add a Comment"
                onChange={(e) => setComment(e.target.value)}
              />
            </label>
            <button
              type="button"
              className="comment-button"
              onClick={handleOnCommentSubmit}
            >
              Comment
            </button>
          </div>
          {build.Comment.slice(0)
            .reverse()
            .map((comment) => {
              return <Comment comment={comment} />;
            })}
        </div>
      </div>
    </Layout>
  );
};

export default Build;
