import React from "react";
import "../css/artifactcarddisplay.css";
import deinitializeName from "./DeinitializeName";
import { GENSHIN_API } from "../constants";
const ARTIFACT_API = `${GENSHIN_API}/artifacts/`;

const ArtifactCardDisplay = ({ artifact }) => {
  return (
    <>
      <div className="artifact-display">
        <img
          src={ARTIFACT_API + deinitializeName(artifact.name) + "/circlet-of-logos"}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              `${GENSHIN_API}/artifacts/adventurer/circlet-of-logos`;
          }}
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

export default ArtifactCardDisplay;
