import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import initializeName from "../components/InitializeName";
import WeaponCard from "../components/WeaponCard";
import "../css/createbuild.css";
import ArtifactCard from "../components/ArtifactCard";
import TeammateCard from "../components/TeammateCard";
import Axios from "axios";
const CHARACTER_API = "https://api.genshin.dev/characters/";
const WEAPON_API = "https://api.genshin.dev/weapons/";
const ARTIFACT_API = "https://api.genshin.dev/artifacts/";

const CreateBuild = () => {
  const [title, setTitle] = useState("");
  const [character, setCharacter] = useState([]);

  //item menus
  const [weaponMenu, setWeaponMenu] = useState([]);
  const [buildWeapon, setBuildWeapon] = useState([]);
  const [artifactMenu, setArtifactMenu] = useState([]);
  const [buildArtifact, setBuildArtifact] = useState([]);
  const [teamMenu, setTeamMenu] = useState([]);
  const [buildTeam, setBuildTeam] = useState([]);

  //search
  const [weaponSearchTerm, setWeaponSearchTerm] = useState("");
  const [artifactSearchTerm, setArtifactSearchTerm] = useState("");
  const [teammateSearchTerm, setTeammateSearchTerm] = useState("");
  const navigate = useNavigate();

  //fetches character w unique character api
  const getCharacter = (characterName) => {
    fetch(CHARACTER_API + characterName)
      .then((res) => res.json())
      .then((data) => {
        setCharacter(data);
      });
  };

  //fetches weapons
  const getWeapons = () => {
    fetch(WEAPON_API + "all")
      .then((res) => res.json())
      .then((data) => {
        setWeaponMenu(data);
      });
  };
  //fetches artifacts
  const getArtifacts = () => {
    fetch(ARTIFACT_API + "all")
      .then((res) => res.json())
      .then((data) => {
        setArtifactMenu(data);
      });
  };
  //fetches teammates
  const getTeam = () => {
    fetch(CHARACTER_API)
      .then((res) => res.json())
      .then((data) => {
        setTeamMenu(data);
      });
  };

  useEffect(() => {
    getCharacter(characterName);
    getWeapons();
    getArtifacts();
    getTeam();
  }, []);

  let { characterName } = useParams();

  const resetHandler = () => {
    setTitle("");
    setWeaponMenu([...buildWeapon, ...weaponMenu]);
    setBuildWeapon([]);
    setArtifactMenu([...buildArtifact, ...artifactMenu]);
    setBuildArtifact([]);
    setTeamMenu([...buildTeam, ...teamMenu]);
    setBuildTeam([]);
  };

  const handleOnBuildSubmit = (e) => {
    if (!title || !buildWeapon || !buildArtifact || !buildTeam) {
      e.preventDefault();
      alert("Please enter all fields!");
    } else {
      Axios({
        method: "POST",
        data: {
          title: title,
          character: characterName,
          weapons: buildWeapon,
          artifacts: buildArtifact,
          teams: buildTeam,
        },
        withCredentials: true,
        url: "http://localhost:5000/builds",
      }).then((res) => {
        if (res.data.status === "err") {
          alert("YOUR BAD");
        }
      });

      resetHandler();
      navigate(`/characters/${characterName}`);
    }
  };

  const weaponHandleOnChange = (e) => {
    setWeaponSearchTerm(e.target.value);
  };
  const artifactHandleOnChange = (e) => {
    setArtifactSearchTerm(e.target.value);
  };
  const teammateHandleOnChange = (e) => {
    setTeammateSearchTerm(e.target.value);
  };

  const weaponHandleOnClick = (weapon) => {
    if (buildWeapon.includes(weapon)) {
      setWeaponMenu([weapon, ...weaponMenu]);
      setBuildWeapon(buildWeapon.filter((w) => w !== weapon));
    } else {
      setBuildWeapon([...buildWeapon, weapon]);
      setWeaponMenu(weaponMenu.filter((w) => w !== weapon));
    }
  };

  const artifactHandleOnClick = (artifact) => {
    if (buildArtifact.includes(artifact)) {
      setArtifactMenu([artifact, ...artifactMenu]);
      setBuildArtifact(buildArtifact.filter((a) => a !== artifact));
    } else {
      setBuildArtifact([...buildArtifact, artifact]);
      setArtifactMenu(artifactMenu.filter((a) => a !== artifact));
    }
  };

  const teamHandleOnClick = (teammate) => {
    if (buildTeam.includes(teammate)) {
      setTeamMenu([teammate, ...teamMenu]);
      setBuildTeam(buildTeam.filter((t) => t !== teammate));
    } else {
      setBuildTeam([...buildTeam, teammate]);
      setTeamMenu(teamMenu.filter((t) => t !== teammate));
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="create-build-page">
      <Layout />
      <div className="container">
        <div
          className={`character-header ${characterName}`}
          style={{
            backgroundImage: `url(https://api.genshin.dev/characters/${characterName}/gacha-splash)`,
          }}
        >
          <img src={CHARACTER_API + characterName + "/icon"} alt={characterName} />
          <ul>
            <li>
              <h2>Genshin Impact</h2>
            </li>
            <li>
              <h1>{character.name}</h1>
            </li>
            <li>
              <h2>
                {" "}
                <span className={`${character.vision}`}>
                  {character.vision}
                </span> &#x2022; {character.weapon}
              </h2>
            </li>
          </ul>
        </div>
        <div className="character-navbar">
          <ul>
            <li>
              <a href="#">Description</a>
            </li>
            <li>
              <a href="#weapon-section">Weapon</a>
            </li>
            <li>
              <a href="#artifacts-section">Artifacts</a>
            </li>
            <li>
              <a href="#teams-section">Teams</a>
            </li>
            <li>
              <a href="#">Showcase</a>
            </li>
          </ul>
        </div>
      </div>
      {/* <form onSubmit={submitHandler}> */}
      <div className="build-container">
        <h1 className="create-title">Creating a new build for {character.name}</h1>

        <div className="title">
          <label>
            <h2>Build Title:</h2>
            <input
              className="build-title"
              type="text"
              value={title}
              placeholder="Enter Build Title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
        </div>

        <a id="weapon-section"></a>
        <div className="divider"></div>
        <div className="break"></div>
        <div className="break"></div>

        <div className="weapon-user">
          <h1 className="menu-tag">{character.name}'s Weapons: </h1>
          <div className="break"></div>
          {buildWeapon.map((weapon) => {
            return (
              <WeaponCard weapon={weapon} weaponHandleOnClick={weaponHandleOnClick} />
            );
          })}
        </div>

        <div className="weapon-menu">
          <h1 className="menu-tag">Select Weapons To Add To Build: </h1>
          <form onSubmit={handleOnSubmit}>
            <input
              className="search-bar"
              type="search"
              value={weaponSearchTerm}
              placeholder="Search Weapon"
              onChange={weaponHandleOnChange}
            />
          </form>
          <div className="break"></div>
          {weaponMenu.length > 0 &&
            weaponMenu
              .filter((weapon) => {
                if (weaponSearchTerm === "" && weapon.type === character.weapon) {
                  return weapon.name;
                } else if (
                  weapon.name.toLowerCase().includes(weaponSearchTerm.toLowerCase()) &&
                  weapon.type === character.weapon
                ) {
                  return weapon.name;
                }
                return false;
              })
              .map((weapon) => {
                return (
                  <WeaponCard weapon={weapon} weaponHandleOnClick={weaponHandleOnClick} />
                );
              })}
          {/* <label>
              <input
                type="text"
                value={buildWeapon}
                placeholder="Enter Weapon"
                onChange={(e) => setBuildWeapon(e.target.value)}
              />
            </label> */}
        </div>

        <a id="artifacts-section"></a>
        <div className="divider"></div>
        <div className="break"></div>
        <div className="break"></div>

        <div className="artifact-user">
          <h1 className="menu-tag">{character.name}'s Artifacts: </h1>
          <div className="break"></div>
          {buildArtifact.map((artifact) => {
            return (
              <ArtifactCard
                artifact={artifact}
                artifactHandleOnClick={artifactHandleOnClick}
              />
            );
          })}
        </div>

        <div className="artifact-menu">
          <h1 className="menu-tag">Select Artifacts To Add To Build: </h1>
          <form onSubmit={handleOnSubmit}>
            <input
              className="search-bar"
              type="search"
              value={artifactSearchTerm}
              placeholder="Search Artifact"
              onChange={artifactHandleOnChange}
            />
          </form>
          <div className="break"></div>
          {artifactMenu.length > 0 &&
            artifactMenu
              .filter((artifact) => {
                if (artifactSearchTerm === "") {
                  return artifact.name;
                } else if (
                  artifact.name.toLowerCase().includes(artifactSearchTerm.toLowerCase())
                ) {
                  return artifact.name;
                }
                return false;
              })
              .map((artifact) => {
                return (
                  <ArtifactCard
                    artifact={artifact}
                    artifactHandleOnClick={artifactHandleOnClick}
                  />
                );
              })}
          {/* <label>
              <input
                type="text"
                value={buildWeapon}
                placeholder="Enter Weapon"
                onChange={(e) => setBuildWeapon(e.target.value)}
              />
            </label> */}
        </div>

        <a id="teams-section"></a>
        <div className="divider"></div>
        <div className="break"></div>
        <div className="break"></div>
        <div className="break"></div>

        <div className="team-user">
          <h1 className="menu-tag">{character.name}'s Team: </h1>
          <div className="break"></div>
          {buildTeam.map((teammate) => {
            return (
              <TeammateCard teammate={teammate} teamHandleOnClick={teamHandleOnClick} />
            );
          })}
        </div>

        <div className="team-menu">
          <h1 className="menu-tag">
            Select Characters To Add To Team for {character.name}:{" "}
          </h1>
          <form onSubmit={handleOnSubmit}>
            <input
              className="search-bar"
              type="search"
              value={teammateSearchTerm}
              placeholder="Search Character"
              onChange={teammateHandleOnChange}
            />
          </form>
          <div className="break"></div>
          {teamMenu.length > 0 &&
            teamMenu
              .filter((teammate) => {
                if (teammateSearchTerm === "") {
                  return teammate;
                } else if (
                  initializeName(teammate)
                    .toLowerCase()
                    .includes(teammateSearchTerm.toLowerCase())
                ) {
                  return teammate;
                }
                return false;
              })
              .map((teammate) => {
                return (
                  <TeammateCard
                    teammate={teammate}
                    teamHandleOnClick={teamHandleOnClick}
                  />
                );
              })}
          {/* <label>
              <input
                type="text"
                value={buildWeapon}
                placeholder="Enter Weapon"
                onChange={(e) => setBuildWeapon(e.target.value)}
              />
            </label> */}
        </div>

        <div className="divider"></div>
        <div className="break"></div>
        <div className="break"></div>

        <button type="button" onClick={handleOnBuildSubmit}>
          Create Build
        </button>

        <button type="button" onClick={resetHandler}>
          Restart
        </button>
        <div className="break"></div>
        <p className="creating-on">Creating on - {new Date().toLocaleDateString()}</p>
      </div>
      {/* </form> */}
    </div>
  );
};

export default CreateBuild;
