import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import initializeName from "../components/InitializeName";
import WeaponCard from "../components/WeaponCard";
import ReplacementWeaponCard from "../components/ReplacementWeaponCard";
import "../css/createbuild.css";
import ArtifactCard from "../components/ArtifactCard";
import TeammateCard from "../components/TeammateCard";
import CharacterHeader from "../components/CharacterHeader";
import Axios from "axios";
import ReactTooltip from "react-tooltip";

const CHARACTER_API = "https://api.genshin.dev/characters/";
const WEAPON_API = "https://api.genshin.dev/weapons/";
const ARTIFACT_API = "https://api.genshin.dev/artifacts/";

const CreateBuild = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [character, setCharacter] = useState([]);

  //item menus
  const [weaponMenu, setWeaponMenu] = useState([]);
  const [replacementWeaponMenu, setReplacementWeaponMenu] = useState([]);
  const [buildWeapon, setBuildWeapon] = useState([]);
  const [buildReplacementWeapon, setBuildReplacementWeapon] = useState([]);
  const [artifactMenu, setArtifactMenu] = useState([]);
  const [buildArtifact, setBuildArtifact] = useState([]);
  const [artifactSandsStat, setArtifactSandsStat] = useState("");
  const [artifactGobletStat, setArtifactGobletStat] = useState("");
  const [artifactCircletStat, setArtifactCircletStat] = useState("");
  const [substats, setSubstats] = useState(["", "", ""]);
  const [substats0, setSubstats0] = useState("");
  const [substats1, setSubstats1] = useState("");
  const [substats2, setSubstats2] = useState("");
  const [teamMenu, setTeamMenu] = useState([]);
  const [buildTeam, setBuildTeam] = useState([]);

  //search
  const [weaponSearchTerm, setWeaponSearchTerm] = useState("");
  const [replacementWeaponSearchTerm, setReplacementWeaponSearchTerm] = useState("");
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
        setReplacementWeaponMenu(data);
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
        setTeamMenu(data.filter((c) => c !== characterName));
      });
  };

  useEffect(() => {
    getCharacter(characterName);
    getWeapons();
    getArtifacts();
    getTeam();
    setBuildTeam([characterName]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let { characterName } = useParams();

  const resetHandler = () => {
    setTitle("");
    setDescription("");
    setWeaponMenu([...buildWeapon, ...weaponMenu]);
    setReplacementWeaponMenu([...buildReplacementWeapon, ...replacementWeaponMenu]);
    setBuildWeapon([]);
    setBuildReplacementWeapon([]);
    setArtifactMenu([...buildArtifact, ...artifactMenu]);
    setBuildArtifact([]);
    if (buildTeam.length > 0) {
      const copyBuildTeam = buildTeam.slice(1);
      setTeamMenu([...copyBuildTeam, ...teamMenu]);
    }
    setBuildTeam([characterName]);
    setArtifactSandsStat("");
    setArtifactGobletStat("");
    setArtifactCircletStat("");
    setSubstats(["", "", ""]);
    setSubstats0("");
    setSubstats1("");
    setSubstats2("");
    window.scrollTo(0, 0);
  };

  const handleOnBuildSubmit = (e) => {
    if (!title || !buildWeapon || !buildArtifact || !buildTeam) {
      e.preventDefault();
      alert("Please enter all fields!");
    } else if (title.length > 23) {
      e.preventDefault();
      alert("Please do not input a title more than 23 characters");
    } else if (buildArtifact.length > 2) {
      e.preventDefault();
      alert("Please do not put more than 2 artifact sets");
    } else if (buildWeapon.length > 4 || buildReplacementWeapon.length > 4) {
      e.preventDefault();
      alert("Please do not put more than 4 weapons");
    } else if (buildTeam.length > 4) {
      e.preventDefault();
      alert("Please do not put more than 4 teammates");
    } else if (
      !artifactSandsStat ||
      !artifactGobletStat ||
      !artifactCircletStat ||
      !substats0 ||
      !substats1 ||
      !substats2
    ) {
      e.preventDefault();
      alert("Please enter all artifact stats!");
    } else {
      Axios(
        {
          method: "POST",
          data: {
            token: sessionStorage.getItem("token"),
            title: title,
            description: description,
            character: characterName,
            weapons: buildWeapon,
            weapons_replacement: buildReplacementWeapon,
            artifacts: buildArtifact,
            artifact_sands_stat: artifactSandsStat,
            artifact_goblet_stat: artifactGobletStat,
            artifact_circlet_stat: artifactCircletStat,
            artifact_substats: [substats0, substats1, substats2],
            teams: buildTeam,
          },
          url: "https://travelerscroll.herokuapp.com/builds",
        },
        { withCredentials: true }
      ).then((res) => {
        if (res.data.status === "err") {
          console.log(res.data);
          alert(res.data.message);
        }
      });

      resetHandler();
      navigate(`/characters/${characterName}`);
      window.location.reload(false);
    }
  };

  const weaponHandleOnChange = (e) => {
    setWeaponSearchTerm(e.target.value);
  };
  const replacementWeaponHandleOnChange = (e) => {
    setReplacementWeaponSearchTerm(e.target.value);
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

  const replacementWeaponHandleOnClick = (weapon) => {
    if (buildReplacementWeapon.includes(weapon)) {
      setReplacementWeaponMenu([weapon, ...replacementWeaponMenu]);
      setBuildReplacementWeapon(buildReplacementWeapon.filter((w) => w !== weapon));
    } else {
      setBuildReplacementWeapon([...buildReplacementWeapon, weapon]);
      setReplacementWeaponMenu(replacementWeaponMenu.filter((w) => w !== weapon));
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
    if (teammate === characterName) {
    } else if (buildTeam.includes(teammate)) {
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

  const substatOptions = [
    "HP",
    "ATK",
    "DEF",
    "HP (%)",
    "ATK (%)",
    "DEF (%)",
    "Elemental Mastery",
    "Energy Recharge (%)",
    "CRIT Rate (%)",
    "CRIT DMG (%)",
  ];
  return (
    <div className="create-build-page">
      <Layout Auth={false} />

      <CharacterHeader character={character} characterName={characterName} />

      <div className="build-container">
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

        <div className="break" id="weapon"></div>

        <div className="weapon-user page-adjust">
          <h1 className="menu-tag">{character.name}'s Weapons </h1>
          <div className="break"></div>
          {buildWeapon.map((weapon, i) => {
            return (
              <div
                key={"buildWeapon" + i}
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
                data-offset="{'top': 10}"
                data-border="true"
                data-border-color="#1e143a"
              >
                <ReactTooltip className="tooltip" />
                <WeaponCard weapon={weapon} weaponHandleOnClick={weaponHandleOnClick} />
              </div>
            );
          })}
        </div>

        <div className="weapon-menu">
          <h1 className="menu-tag">Select Weapons To Add To Build </h1>
          <form onSubmit={handleOnSubmit}>
            <input
              className="weapon-search-bar"
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
              .map((weapon, i) => {
                return (
                  <div
                    key={"weaponMenu" + i}
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
                    data-offset="{'top': 10}"
                    data-border="true"
                    data-border-color="#1e143a"
                  >
                    <ReactTooltip className="tooltip" />
                    <WeaponCard
                      weapon={weapon}
                      weaponHandleOnClick={weaponHandleOnClick}
                    />
                  </div>
                );
              })}
        </div>

        <div className="break" id="replacement-weapons"></div>

        <div className="weapon-user">
          <h1 className="menu-tag">{character.name}'s Replacement Weapons </h1>
          <div className="break"></div>
          {buildReplacementWeapon.map((weapon, i) => {
            return (
              <div
                key={"replacementWeapon" + i}
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
                data-offset="{'top': 10}"
                data-border="true"
                data-border-color="#1e143a"
              >
                <ReactTooltip className="tooltip" />
                <ReplacementWeaponCard
                  weapon={weapon}
                  replacementWeaponHandleOnClick={replacementWeaponHandleOnClick}
                />
              </div>
            );
          })}
        </div>

        <div className="weapon-menu">
          <h1 className="menu-tag">Select Replacement Weapons To Add To Build </h1>
          <form onSubmit={handleOnSubmit}>
            <input
              className="weapon-search-bar"
              type="search"
              value={replacementWeaponSearchTerm}
              placeholder="Search Weapon"
              onChange={replacementWeaponHandleOnChange}
            />
          </form>
          <div className="break"></div>
          {replacementWeaponMenu.length > 0 &&
            replacementWeaponMenu
              .filter((weapon) => {
                if (
                  replacementWeaponSearchTerm === "" &&
                  weapon.type === character.weapon &&
                  weapon.rarity < 5
                ) {
                  return weapon.name;
                } else if (
                  weapon.name
                    .toLowerCase()
                    .includes(replacementWeaponSearchTerm.toLowerCase()) &&
                  weapon.type === character.weapon &&
                  weapon.rarity < 5
                ) {
                  return weapon.name;
                }
                return false;
              })
              .map((weapon, i) => {
                return (
                  <div
                    key={"replacementWeaponMenu" + i}
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
                    data-offset="{'top': 10}"
                    data-border="true"
                    data-border-color="#1e143a"
                  >
                    <ReactTooltip className="tooltip" />
                    <ReplacementWeaponCard
                      weapon={weapon}
                      replacementWeaponHandleOnClick={replacementWeaponHandleOnClick}
                    />
                  </div>
                );
              })}
        </div>

        <div className="break" id="break"></div>

        <div className="artifact-user">
          <h1 className="menu-tag">{character.name}'s Artifacts </h1>
          <div className="break"></div>
          {buildArtifact.map((artifact, i) => {
            return (
              <div
                key={"buildArtifact" + i}
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
                data-offset="{'top': 60}"
                data-border="true"
                data-border-color="#1e143a"
              >
                <ReactTooltip className="tooltip" />
                <ArtifactCard
                  artifact={artifact}
                  artifactHandleOnClick={artifactHandleOnClick}
                />
              </div>
            );
          })}
        </div>

        <div className="artifact-menu">
          <h1 className="menu-tag">Select Artifacts To Add To Build </h1>
          <form onSubmit={handleOnSubmit}>
            <input
              className="artifact-search-bar"
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
              .map((artifact, i) => {
                return (
                  <div
                    key={"artifactMenu" + i}
                    data-html="true"
                    data-tip={`<span style="color: #216CE4; font-size: 16px">${artifact.name}</span> 
                    <br /> 
                    <br /> 2-Piece Set: ${artifact["2-piece_bonus"]}
                    <br /> 4-Piece Set: ${artifact["4-piece_bonus"]}
                    <br />
                    <br />  <span style="color: #d1b132">Max ${artifact.max_rarity} Star Artifact</span>
                    <br /> 
                    `}
                    data-effect="solid"
                    data-offset="{'top': 60}"
                    data-border="true"
                    data-border-color="#1e143a"
                  >
                    <ReactTooltip className="tooltip" />
                    <ArtifactCard
                      artifact={artifact}
                      artifactHandleOnClick={artifactHandleOnClick}
                    />
                  </div>
                );
              })}
        </div>

        <div className="break-inner"></div>

        <h1 className="artifact-stats-header"> Stat Priority </h1>
        <div className="break-inner"></div>
        <div className="artifact-stats">
          <div className="sands-stats">
            <img
              alt="sands"
              src="https://i.imgur.com/RXrhpWn.png"
              width="80"
              height="80"
            ></img>
            <div className="break-inner"></div>
            <select
              value={artifactSandsStat}
              onChange={(e) => setArtifactSandsStat(e.target.value)}
              name="sands-stats"
              className="sands-stats-select"
              id="sands-stats"
            >
              <option style={{ display: "none" }}>Select sands stat</option>
              <option value="HP (%)">HP (%)</option>
              <option value="ATK (%)">ATK (%)</option>
              <option value="DEF (%)">DEF (%)</option>
              <option value="Elemental Mastery">Elemental Mastery</option>
              <option value="Energy Recharge (%)">Energy Recharge (%)</option>
            </select>
          </div>

          <div className="goblet-stats">
            <img
              alt="goblet"
              src="https://i.imgur.com/3NkBRCI.png"
              width="80"
              height="80"
            ></img>
            <div className="break-inner"></div>
            <select
              value={artifactGobletStat}
              onChange={(e) => setArtifactGobletStat(e.target.value)}
              name="goblet-stats"
              className="goblet-stats-select"
              id="goblet-stats"
            >
              <option style={{ display: "none" }}>Select goblet stat</option>
              <option value="HP (%)">HP (%)</option>
              <option value="ATK (%)">ATK (%)</option>
              <option value="DEF (%)">DEF (%)</option>
              <option value="Elemental Mastery">Elemental Mastery</option>
              <option value="Pyro DMG Bonus (%)">Pyro DMG Bonus (%)</option>
              <option value="Geo DMG Bonus (%)">Geo DMG Bonus (%)</option>
              <option value="Dendro DMG Bonus (%)">Dendro DMG Bonus (%)</option>
              <option value="Cryo DMG Bonus (%)">Cryo DMG Bonus (%)</option>
              <option value="Electro DMG Bonus (%)">Electro DMG Bonus (%)</option>
              <option value="Anemo DMG Bonus (%)">Anemo DMG Bonus (%)</option>
              <option value="Hydro DMG Bonus (%)">Hydro DMG Bonus (%)</option>
              <option value="Physical DMG Bonus (%)">Physical DMG Bonus (%)</option>
            </select>
          </div>

          <div className="circlet-stats">
            <img
              alt="circlet"
              src="https://i.imgur.com/FcVNC5B.png"
              width="80"
              height="80"
            ></img>
            <div className="break-inner"></div>
            <select
              value={artifactCircletStat}
              onChange={(e) => setArtifactCircletStat(e.target.value)}
              name="circlet-stats"
              className="circlet-stats-select"
              id="circlet-stats"
            >
              <option style={{ display: "none" }}>Select circlet stat</option>
              <option value="HP (%)">HP (%)</option>
              <option value="ATK (%)">ATK (%)</option>
              <option value="DEF (%)">DEF (%)</option>
              <option value="Elemental Mastery">Elemental Mastery</option>
              <option value="CRIT Rate (%)">CRIT Rate (%)</option>
              <option value="CRIT DMG (%)">CRIT DMG (%)</option>
              <option value="Healing Bonus (%)">Healing Bonus (%)</option>
            </select>
          </div>

          <div className="substats">
            <h1>Substats</h1>
            <div className="break-inner"></div>
            <select
              value={substats[0]}
              onChange={(e) => {
                //logic to change array state by index
                let items = [...substats];
                let item = items[0];
                item = e.target.value;
                items[0] = item;
                setSubstats0(item);
                setSubstats(items);
              }}
              name="substats"
              className="substats-select"
              id="substats"
            >
              <option style={{ display: "none" }}>Select substat</option>
              {substatOptions.map((o) => {
                return (
                  o !== substats1 &&
                  o !== substats2 && (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  )
                );
              })}
            </select>
            <div className="break-inner"></div>
            <select
              value={substats1}
              onChange={(e) => {
                //logic to change array state by index
                let items = [...substats];
                let item = items[1];
                item = e.target.value;
                items[1] = item;
                setSubstats1(item);
                setSubstats(items);
              }}
              name="substats"
              className="substats-select"
              id="substats"
            >
              <option style={{ display: "none" }}>Select substat</option>
              {substatOptions.map((o) => {
                return (
                  o !== substats0 &&
                  o !== substats2 && (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  )
                );
              })}
            </select>
            <div className="break-inner"></div>
            <select
              value={substats2}
              onChange={(e) => {
                //logic to change array state by index
                let items = [...substats];
                let item = items[2];
                item = e.target.value;
                items[2] = item;
                setSubstats2(e.target.value);
                setSubstats(items);
              }}
              name="substats"
              className="substats-select"
              id="substats"
            >
              <option style={{ display: "none" }}>Select substat</option>
              {substatOptions.map((o) => {
                return (
                  o !== substats0 &&
                  o !== substats1 && (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  )
                );
              })}
            </select>
            <div className="break"></div>
            <div className="break"></div>
            <div className="break"></div>
            <div className="break"></div>
          </div>
        </div>

        <div className="break"></div>
        <div className="break"></div>
        <div className="break"></div>
        <div className="break-inner"></div>

        <div className="team-user" id="teams">
          <h1 className="menu-tag">{character.name}'s Team </h1>
          <div className="break"></div>
          {buildTeam.map((teammate, i) => {
            return (
              <TeammateCard
                key={i}
                teammate={teammate}
                teamHandleOnClick={teamHandleOnClick}
              />
            );
          })}
        </div>

        <div className="team-menu">
          <h1 className="menu-tag">Select Characters To Add To Team</h1>
          <form onSubmit={handleOnSubmit}>
            <input
              className="teammate-search-bar"
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
              .map((teammate, i) => {
                return (
                  <TeammateCard
                    key={i}
                    teammate={teammate}
                    teamHandleOnClick={teamHandleOnClick}
                  />
                );
              })}
        </div>

        <div className="break-inner"></div>
        <div className="description">
          <h1>Description </h1>
          <div className="break-inner"></div>
          <textarea
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          ></textarea>
        </div>

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
