import "../css/talentcard.css";

const TalentCard = ({ talent, character, characterName }) => {
  const CHARACTER_API = "https://api.genshin.dev/characters/";
  console.log(talent);
  return (
    <div className="talent-card">
      {talent.unlock === "Normal Attack" && (
        <>
          <img src={CHARACTER_API + characterName + "/talent-na"}></img>
          <div className="break"></div>
          <h3>{talent.name}</h3>
          <div className="break"></div>
          <h4>Normal Attack</h4>
        </>
      )}
      {talent.unlock === "Elemental Skill" && (
        <>
          <img src={CHARACTER_API + characterName + "/talent-skill"}></img>
          <div className="break"></div>
          <h3>{talent.name}</h3>
          <div className="break"></div>
          <h4>Elemental Skill</h4>
        </>
      )}
      {talent.unlock === "Elemental Burst" && (
        <>
          <img src={CHARACTER_API + characterName + "/talent-burst"}></img>
          <div className="break"></div>
          <h3>{talent.name}</h3>
          <div className="break"></div>
          <h4>Elemental Burst</h4>
        </>
      )}

      <div className="talent-description-text">
        {/* <p>{talent.description}</p> */}
        {talent.description.split("\n").map((line) => {
          return <p>{line}</p>;
        })}
      </div>
    </div>
  );
};

export default TalentCard;
