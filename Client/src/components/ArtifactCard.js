import React from "react";
import "../css/artifactcard.css";
import deinitializeName from "./DeinitializeName";
import initializeName from "./InitializeName";
const ARTIFACT_API = "https://api.genshin.dev/artifacts/";

const ArtifactCard = ({ artifact, artifactHandleOnClick }) => {
  console.log(ARTIFACT_API + deinitializeName(artifact.name) + "/circlet-of-logos");
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
        />

        <h3>{artifact.name}</h3>
      </div>
    </>
  );
};

export default ArtifactCard;
