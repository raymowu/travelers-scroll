import React from "react";
import "../css/artifactcard.css";
import deinitializeName from "./DeinitializeName";
const ARTIFACT_API = "https://api.genshin.dev/artifacts/";

const ArtifactCard = ({ artifact, artifactHandleOnClick }) => {
  return (
    <>
      <div className="artifact">
        <img
          src={ARTIFACT_API + deinitializeName(artifact.name) + "/circlet-of-logos"}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://api.genshin.dev/artifacts/adventurer/circlet-of-logos";
          }}
          onClick={() => artifactHandleOnClick(artifact)}
          alt={artifact.name}
          style={{
            backgroundImage:
              artifact.max_rarity === 1
                ? "url('https://i.imgur.com/l36Qgzw.png')"
                : artifact.max_rarity === 2
                ? "url('https://i.imgur.com/8RBtke0.png')"
                : artifact.max_rarity === 3
                ? "url('https://i.imgur.com/QD9BEvl.png')"
                : artifact.max_rarity === 4
                ? "url('https://i.imgur.com/sg3xxcl.png')"
                : "url('https://i.imgur.com/66bWnNJ.png')",
          }}
        />

        <h3>{artifact.name}</h3>
      </div>
    </>
  );
};

export default ArtifactCard;
