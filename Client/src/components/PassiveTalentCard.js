import "../css/talentcard.css";
import { GENSHIN_API } from "../constants";

const PassiveTalentCard = ({ ptalent, character, characterName }) => {
  const CHARACTER_API = `${GENSHIN_API}/characters/`;
  return (
    <div className="talent-card">
      {ptalent.unlock === "Unlocked at Ascension 1" && (
        <>
          <img
            src={CHARACTER_API + characterName + "/talent-passive-0"}
            alt="talent-passive-0"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://i.imgur.com/4Ee24al.png";
            }}
          ></img>
          <div className="break"></div>
          <h3>{ptalent.name}</h3>
          <div className="break"></div>
          <h4>{ptalent.unlock}</h4>
        </>
      )}
      {ptalent.unlock === "Unlocked at Ascension 4" && (
        <>
          <img
            src={CHARACTER_API + characterName + "/talent-passive-1"}
            alt="talent-passive-1"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://i.imgur.com/4Ee24al.png";
            }}
          ></img>
          <div className="break"></div>
          <h3>{ptalent.name}</h3>
          <div className="break"></div>
          <h4>{ptalent.unlock}</h4>
        </>
      )}
      {ptalent.unlock === "Unlocked Automatically" &&
        ptalent.name !== "Princess of Watatsumi" && (
          <>
            <img
              src={CHARACTER_API + characterName + "/talent-passive-2"}
              alt="talent-passive-2"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://i.imgur.com/4Ee24al.png";
              }}
            ></img>
            <div className="break"></div>
            <h3>{ptalent.name}</h3>
            <div className="break"></div>
            <h4>{ptalent.unlock}</h4>
          </>
        )}
      {ptalent.name === "Princess of Watatsumi" && (
        <>
          <img
            src={CHARACTER_API + characterName + "/talent-passive-misc"}
            alt="talent-passive-3"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://i.imgur.com/4Ee24al.png";
            }}
          ></img>
          <div className="break"></div>
          <h3>{ptalent.name}</h3>
          <div className="break"></div>
          <h4>{ptalent.unlock}</h4>
        </>
      )}

      <div className="talent-description-text">
        {/* <p>{talent.description}</p> */}
        {ptalent.description.split("\n").map((line, i) => {
          return <p key={i}>{line}</p>;
        })}
      </div>
    </div>
  );
};

export default PassiveTalentCard;
