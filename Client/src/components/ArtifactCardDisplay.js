import React from "react";
import "../css/artifactcard.css";
import deinitializeName from "./DeinitializeName";
const ARTIFACT_API = "https://api.genshin.dev/artifacts/";

const ArtifactCardDisplay = ({ artifact }) => {
  console.log(ARTIFACT_API + deinitializeName(artifact.name) + "/circlet-of-logos");
  return (
    <>
      <div className="artifact">
        <img
          src={ARTIFACT_API + deinitializeName(artifact.name) + "/circlet-of-logos"}
          alt={artifact.name}
        />

        <h3>{artifact.name}</h3>
      </div>
    </>
  );
};

export default ArtifactCardDisplay;
