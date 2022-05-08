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

const CHARACTER_API = "https://api.genshin.dev/characters/";

const Build = () => {
  const [build, setBuild] = useState({
    Author: {
      id: 0,
      username: "",
    },
    _id: 0,
    title: "",
    character: "",
    weapons: [
      {
        name: "",
        type: "",
        rarity: 0,
        baseAttack: 0,
        subStat: "",
        passiveName: "",
        passiveDesc: "",
        location: "",
      },
    ],
    artifacts: [
      {
        name: "",
        max_rarity: 0,
        "2-piece_bonus": "",
        "4-piece_bonus": "",
      },
    ],
    teams: [{}],
    Comment: [
      {
        Author: {
          id: 0,
          username: "",
        },
      },
    ],
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
        <h1 className="buildpage-title">{build.title}</h1>
        <div className="break"></div>
        <h4 className="buildpage-username">by {build.Author.username}</h4>
        <div className="break"></div>
        <h4 className="buildpage-likes">
          <span className="buildpage-likes-text">{build.likes}</span>
          <LikeButton
            liked={build.LikedUsers.includes(user)}
            handleOnLike={handleOnLike}
          />
        </h4>

        <div className="divider"></div>
        <div id="weapon" className="break"></div>

        <h2>Weapons: </h2>

        <div className="break"></div>

        <div className="weapon-container">
          {build.weapons.map((weapon) => {
            return <WeaponCardDisplay weapon={weapon} />;
          })}
        </div>

        <div id="artifacts" className="break"></div>

        <h2>Artifacts: </h2>
        <div className="break"></div>
        <div className="artifact-container">
          {build.artifacts.map((artifact) => {
            return <ArtifactCardDisplay artifact={artifact} />;
          })}
        </div>

        <div id="teams" className="break"></div>

        <h2>Team: </h2>
        <div className="break"></div>
        <div className="team-container">
          {build.teams.map((teammate) => {
            return <TeammateCardDisplay teammate={teammate} />;
          })}
        </div>
        <div className="break"></div>
        <div className="divider"></div>
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
          {build.Comment.map((comment) => {
            return <Comment comment={comment} />;
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Build;
