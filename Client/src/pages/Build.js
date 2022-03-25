import { useState, useParams, useEffect } from "react";
import CharacterHeader from "../components/CharacterHeader";
const CHARACTER_API = "https://api.genshin.dev/characters/";
const Build = () => {
  //   //characterName is un capitalized, character.name is capitalized
  //   const [character, setCharacter] = useState([]);
  //   const [build, setBuild] = useState([]);
  //   //fetches character w unique character api
  //   const getCharacter = (characterName) => {
  //     fetch(CHARACTER_API + characterName)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setCharacter(data);
  //       });
  //   };

  //   const getBuild = () => {
  //     fetch(`http://localhost:5000/builds/build/${buildid}`)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setBuild(data.builds);
  //       });
  //   };

  //   useEffect(() => {
  //     getBuild();
  //   }, []);

  //   console.log(build);
  //   let { characterName } = build.character;
  //   let { buildid } = useParams();
  return (
    <>
      <div>build</div>
      {/* <CharacterHeader characterName={characterName} character={character} /> */}
    </>
  );
};

export default Build;
