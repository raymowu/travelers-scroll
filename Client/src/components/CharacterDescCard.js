import "../css/characterdesccard.css";

const CharacterDescCard = ({ character, characterName }) => {
  return (
    <div className="char-desc-cont">
      <p>
        <span className="attribute">Name:</span> {character.name}
      </p>
      <i>{character.description}</i>
      <p>
        <span className="attribute">Nation:</span> {character.nation}
      </p>
      <p>
        <span className="attribute">Affiliation:</span> {character.affiliation}
      </p>
      <p>
        <span className="attribute">Constellation:</span> {character.constellation}
      </p>
      <p>
        <span className="attribute">Birthday:</span>{" "}
        {character.birthday ? character.birthday.substring(5) : ""}
      </p>
    </div>
  );
};

export default CharacterDescCard;
