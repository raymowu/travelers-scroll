import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CharacterHeader from "../components/CharacterHeader";
import Layout from "../components/Layout";
import WeaponCard from "../components/WeaponCard";
import "../css/buildpage.css";
import BuildCard from "../components/BuildCard";
import WeaponCardDisplay from "../components/WeaponCardDisplay";
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
  console.log(build.weapons[0]);
  // console.log(build.weapons[0].name);
  // console.log(build.weapons);
  // console.log(build.Author);
  return (
    <Layout>
      <CharacterHeader characterName={characterName} character={character} />
      <div className="buildpage-container">
        <h1 className="buildpage-title">{build.title}</h1>
        <h4 className="buildcard-username">by {build.Author.username}</h4>
        <h1>{build.artifacts[0]["2-piece_bonus"]}</h1>
        <h1>{build.artifacts[0].name}</h1>
        {build.weapons.map((weapon) => {
          console.log(weapon);
          return <WeaponCardDisplay weapon={weapon} />;
        })}
      </div>
    </Layout>
  );
};

export default Build;
