import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CharacterHeader from "../components/CharacterHeader";
const CHARACTER_API = "https://api.genshin.dev/characters/";

const Build = () => {
  const [build, setBuild] = useState([]);
  const [characterName, setCharacterName] = useState([]);
  const [character, setCharacter] = useState([]);

  const getBuild = (buildid) => {
    fetch(`http://localhost:5000/builds/build/${buildid}`)
      .then((res) => res.json())
      .then((data) => {
        setBuild(data);
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
  console.log(characterName);
  console.log(character);
  return (
    <>
      <div>build</div>
      <CharacterHeader characterName={characterName} character={character} />
    </>
  );
};

export default Build;
