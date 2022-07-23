import "../css/talentcard.css";

const PassiveTalentCard = ({ ptalent, character, characterName }) => {
  const CHARACTER_API = "https://api.genshin.dev/characters/";
  console.log(CHARACTER_API + characterName + "/talent-passive-0");
  return (
    <div className="talent-card">
      {ptalent.unlock === "Unlocked at Ascension 1" && (
        <>
          <img
            src={CHARACTER_API + characterName + "/talent-passive-0"}
            alt="talent-passive-0"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = CHARACTER_API + characterName + "/talent-passive-1";
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
          ></img>
          <div className="break"></div>
          <h3>{ptalent.name}</h3>
          <div className="break"></div>
          <h4>{ptalent.unlock}</h4>
        </>
      )}

      <div className="talent-description-text">
        {/* <p>{talent.description}</p> */}
        {ptalent.description.split("\n").map((line) => {
          return <p>{line}</p>;
        })}
      </div>
    </div>
  );
};

export default PassiveTalentCard;
