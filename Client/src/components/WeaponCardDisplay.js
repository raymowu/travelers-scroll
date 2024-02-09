import React from "react";
import "../css/weaponcarddisplay.css";
import deinitializeName from "./DeinitializeName";
import { GENSHIN_API } from "../constants";

const WEAPON_API = `${GENSHIN_API}/weapons/`;

const WeaponCardDisplay = ({ weapon }) => {
  return (
    <>
      <div className="weapon-display">
        <img
          src={WEAPON_API + deinitializeName(weapon.name) + "/icon"}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://i.imgur.com/4Ee24al.png";
          }}
          alt={weapon.name}
          style={{
            backgroundImage:
              weapon.rarity === 1
                ? "url('https://i.imgur.com/l36Qgzw.png')"
                : weapon.rarity === 2
                ? "url('https://i.imgur.com/8RBtke0.png')"
                : weapon.rarity === 3
                ? "url('https://i.imgur.com/QD9BEvl.png')"
                : weapon.rarity === 4
                ? "url('https://i.imgur.com/sg3xxcl.png')"
                : "url('https://i.imgur.com/66bWnNJ.png')",
          }}
        />
        <h3>{weapon.name}</h3>
      </div>
    </>
  );
};

export default WeaponCardDisplay;
