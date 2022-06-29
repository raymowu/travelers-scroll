import React from "react";
import "../css/character.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import BuildCard from "../components/BuildCard";
import CharacterInfoHeader from "../components/CharacterInfoHeader";
import TalentCard from "../components/TalentCard";
import CharacterDescCard from "../components/CharacterDescCard";
import PassiveTalentCard from "../components/PassiveTalentCard";
import ConstellationCard from "../components/Constellation";
const CHARACTER_API = "https://api.genshin.dev/characters/";

const Character = () => {
  const navigate = useNavigate();
  //characterName is un capitalized, character.name is capitalized
  const [character, setCharacter] = useState([]);
  const [builds, setBuilds] = useState([]);
  //fetches character w unique character api
  const getCharacter = (characterName) => {
    fetch(CHARACTER_API + characterName)
      .then((res) => res.json())
      .then((data) => {
        setCharacter(data);
      });
  };
  const getBuilds = () => {
    fetch(`http://localhost:5000/builds/${characterName}`)
      .then((res) => res.json())
      .then((data) => {
        setBuilds(data.builds);
      });
  };

  let { characterName } = useParams();

  useEffect(() => {
    getCharacter(characterName);
    getBuilds();
  }, []);

  const handleOnCreateBuild = (e) => {
    navigate(`/createbuild/${characterName}`);
  };

  return (
    <Layout>
      <CharacterInfoHeader character={character} characterName={characterName} />
      <div className="container2">
        <div className="break" id="description"></div>
        <div className="break"></div>
        <h1 className="char-desc-head">{character.name} Description</h1>
        <div className="char-desc-c">
          <CharacterDescCard character={character} characterName={characterName} />
        </div>

        <h1 id="talents">{character.name} Skill Talents</h1>
        <div className="talent-container">
          {character.skillTalents?.map((talent) => {
            return (
              <>
                <TalentCard
                  key={talent.name}
                  character={character}
                  characterName={characterName}
                  talent={talent}
                />
              </>
            );
          })}
        </div>
        <h1 className="passive-talents-head" id="passives">
          {character.name} Passive Talents
        </h1>
        <div className="talent-container">
          {character.passiveTalents?.map((ptalent) => {
            return (
              <>
                <PassiveTalentCard
                  key={ptalent.name}
                  character={character}
                  characterName={characterName}
                  ptalent={ptalent}
                />
              </>
            );
          })}
        </div>

        <h1 className="passive-talents-head" id="constellations">
          {character.name} Constellations
        </h1>
        <div className="talent-container">
          {character.constellations?.slice(0, 3).map((constellation) => {
            return (
              <>
                <ConstellationCard
                  key={constellation.name}
                  character={character}
                  characterName={characterName}
                  constellation={constellation}
                />
              </>
            );
          })}
        </div>
        <div className="constellation-break"></div>
        <div className="constellation-container">
          {character.constellations?.slice(3, 7).map((constellation) => {
            return (
              <>
                <ConstellationCard
                  key={constellation.name}
                  character={character}
                  characterName={characterName}
                  constellation={constellation}
                />
              </>
            );
          })}
        </div>

        <h1 className="recent-builds" id="showcase">
          Recent {character.name} Builds:
        </h1>
        <div className="break"></div>
        <button type="button" className="button-18" onClick={handleOnCreateBuild}>
          Create {`${character.name}`} Build
        </button>
        <div className="build-container">
          {builds.length > 0 &&
            builds
              .slice(0)
              .reverse()
              .map((build) => {
                return (
                  <>
                    <BuildCard key={build._id} build={build} />
                    <div className="break"></div>
                  </>
                );
              })}
        </div>
      </div>
    </Layout>
  );
};

export default Character;
