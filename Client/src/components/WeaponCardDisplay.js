import React from "react";
import "../css/weaponcarddisplay.css";
import deinitializeName from "./DeinitializeName";
const WEAPON_API = "https://api.genshin.dev/weapons/";

const WeaponCardDisplay = ({ weapon }) => {
  return (
    <>
      <div className="weapon-display">
        <img
          src={WEAPON_API + deinitializeName(weapon.name) + "/icon"}
          alt={weapon.name}
        />
        <h3>{weapon.name}</h3>
      </div>
    </>
  );
};

export default WeaponCardDisplay;
