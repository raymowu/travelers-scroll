import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CharacterHeader from "../components/CharacterHeader";
import Layout from "../components/Layout";
import "../css/buildpage.css";
import WeaponCardDisplay from "../components/WeaponCardDisplay";
import ArtifactCardDisplay from "../components/ArtifactCardDisplay";
import TeammateCardDisplay from "../components/TeammateCardDisplay";
import Comment from "../components/Comment";
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
    __v: 0,
  });
  const [characterName, setCharacterName] = useState("");
  const [character, setCharacter] = useState([]);

  const getBuild = (buildid) => {
    fetch(`http://localhost:5000/builds/build/${buildid}`)
      .then((res) => res.json())
      .then((data) => {
        setBuild(data.build);
        setCharacterName(data.build.character);
        getCharacter(data.build.character);
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
  }, []);

  console.log(build);
  console.log(build.weapons);
  console.log(build.teams);
  // console.log(build.weapons[0].name);
  // console.log(build.weapons);
  // console.log(build.Author);
  return (
    <Layout>
      <CharacterHeader characterName={characterName} character={character} />
      <div className="buildpage-container">
        <h1 className="buildpage-title">{build.title}</h1>
        <div className="break"></div>
        <h4 className="buildpage-username">by {build.Author.username}</h4>
        <div className="break"></div>
        <h4 className="buildpage-likes">{build.likes} likes</h4>
        <div className="break"></div>

        <h2>Weapons: </h2>
        <div id="weapon" className="break"></div>
        <div className="weapon-container">
          {build.weapons.map((weapon) => {
            return <WeaponCardDisplay weapon={weapon} />;
          })}
        </div>

        <div className="break"></div>

        <h2>Artifacts: </h2>
        <div className="break"></div>
        <div id="artifacts" className="artifact-container">
          {build.artifacts.map((artifact) => {
            return <ArtifactCardDisplay artifact={artifact} />;
          })}
        </div>

        <div className="break"></div>

        <h2>Team: </h2>
        <div id="teams" className="break"></div>
        <div className="team-container">
          {build.teams.map((teammate) => {
            return <TeammateCardDisplay teammate={teammate} />;
          })}
        </div>
        <div className="break"></div>
        <div className="divider"></div>
        <div className="break"></div>

        <div className="comment-container">
          {build.Comment.map((comment) => {
            console.log(comment);
            return <Comment comment={comment} />;
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Build;
