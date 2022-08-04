import "../css/characterheader.css";
const CHARACTER_API = "https://api.genshin.dev/characters/";
const ProfileHeader = ({ user }) => {
  return (
    <div className="container">
      <div
        className={`character-header ${"hu-tao"}`}
        style={{
          backgroundImage: `url(https://api.genshin.dev/characters/hu-tao/gacha-splash)`,
        }}
      >
        <div className="character-icon-container">
          <img src={CHARACTER_API + "hu-tao/icon"} alt="profile-pic" />
        </div>
        <ul>
          <li>
            <h2>Traveler's Scroll</h2>
          </li>
          <li>
            <h1>{user.username}</h1>
          </li>

          <li>
            <h2 className="profile-buildcount">{}</h2>
          </li>
          <li>
            <h2 className="profile-date">{user.date}</h2>
          </li>
        </ul>
      </div>

      <div className="profile-navbar">
        <ul>
          <li>
            <a href="#liked-builds">Liked Builds</a>
          </li>
          <li>
            <a href="#created-builds">Created Builds</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileHeader;
