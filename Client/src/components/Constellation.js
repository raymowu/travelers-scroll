import "../css/talentcard.css";

const ConstellationCard = ({ constellation, character, characterName }) => {
  const CHARACTER_API = "https://api.genshin.dev/characters/";
  return (
    <div className="talent-card">
      {constellation.unlock === "Constellation Lv. 1" && (
        <>
          <img
            src={CHARACTER_API + characterName + "/constellation-1"}
            alt={"constellation-1"}
          ></img>
          <div className="break"></div>
          <h3>{constellation.name}</h3>
          <div className="break"></div>
          <h4>{constellation.unlock}</h4>
        </>
      )}
      {constellation.unlock === "Constellation Lv. 2" && (
        <>
          <img
            src={CHARACTER_API + characterName + "/constellation-2"}
            alt={"constellation-2"}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = CHARACTER_API + characterName + "/cosntellation-2";
            }}
          ></img>
          <div className="break"></div>
          <h3>{constellation.name}</h3>
          <div className="break"></div>
          <h4>{constellation.unlock}</h4>
        </>
      )}
      {constellation.unlock === "Constellation Lv. 3" && (
        <>
          <img
            src={CHARACTER_API + characterName + "/constellation-3"}
            alt={"constellation-3"}
          ></img>
          <div className="break"></div>
          <h3>{constellation.name}</h3>
          <div className="break"></div>
          <h4>{constellation.unlock}</h4>
        </>
      )}
      {constellation.unlock === "Constellation Lv. 4" && (
        <>
          <img
            src={CHARACTER_API + characterName + "/constellation-4"}
            alt={"constellation-4"}
          ></img>
          <div className="break"></div>
          <h3>{constellation.name}</h3>
          <div className="break"></div>
          <h4>{constellation.unlock}</h4>
        </>
      )}
      {constellation.unlock === "Constellation Lv. 5" && (
        <>
          <img
            src={CHARACTER_API + characterName + "/constellation-5"}
            alt={"constellation-5"}
          ></img>
          <div className="break"></div>
          <h3>{constellation.name}</h3>
          <div className="break"></div>
          <h4>{constellation.unlock}</h4>
        </>
      )}
      {constellation.unlock === "Constellation Lv. 6" && (
        <>
          <img
            src={CHARACTER_API + characterName + "/constellation-6"}
            alt={"constellation-6"}
          ></img>
          <div className="break"></div>
          <h3>{constellation.name}</h3>
          <div className="break"></div>
          <h4>{constellation.unlock}</h4>
        </>
      )}

      <div className="talent-description-text">
        {/* <p>{talent.description}</p> */}
        {constellation.description.split("\n").map((line, i) => {
          return <p key={i}>{line}</p>;
        })}
      </div>
    </div>
  );
};

export default ConstellationCard;
