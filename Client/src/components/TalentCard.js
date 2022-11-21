import "../css/talentcard.css";

const TalentCard = ({ talent, character, characterName }) => {
  const CHARACTER_API = "https://api.genshin.dev/characters/";
  return (
    <div className="talent-card">
      {talent.unlock.toLowerCase() === "normal attack" && (
        <>
          <img
            src={CHARACTER_API + characterName + "/talent-na"}
            alt="talent-na"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://i.imgur.com/4Ee24al.png";
            }}
          ></img>
          <div className="break"></div>
          <h3>{talent.name}</h3>
          <div className="break"></div>
          <h4>Normal Attack</h4>
        </>
      )}
      {talent.unlock.toLowerCase() === "elemental skill" && (
        <>
          <img
            src={CHARACTER_API + characterName + "/talent-skill"}
            alt="talent-skill"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://i.imgur.com/4Ee24al.png";
            }}
          ></img>
          <div className="break"></div>
          <h3>{talent.name}</h3>
          <div className="break"></div>
          <h4>Elemental Skill</h4>
        </>
      )}
      {talent.unlock.toLowerCase() === "elemental burst" && (
        <>
          <img
            src={CHARACTER_API + characterName + "/talent-burst"}
            alt="talent-burst"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://i.imgur.com/4Ee24al.png";
            }}
          ></img>
          <div className="break"></div>
          <h3>{talent.name}</h3>
          <div className="break"></div>
          <h4>Elemental Burst</h4>
        </>
      )}
      {talent.unlock === "Right Click" && (
        <>
          <img
            src={CHARACTER_API + characterName + "/talent-passive-misc"}
            alt="talent-passive-misc"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://i.imgur.com/4Ee24al.png";
            }}
          ></img>
          <div className="break"></div>
          <h3>{talent.name}</h3>
          <div className="break"></div>
          <h4>Right Click</h4>
        </>
      )}

      <div className="talent-description-text">
        {/* <p>{talent.description}</p> */}
        {talent.description.split("\n").map((line, i) => {
          return <p key={i}>{line}</p>;
        })}
      </div>
    </div>
  );
};

export default TalentCard;
