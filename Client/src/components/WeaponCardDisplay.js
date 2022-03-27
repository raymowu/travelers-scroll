import React from "react";
import "../css/weaponcard.css";
import deinitializeName from "./DeinitializeName";
const WEAPON_API = "https://api.genshin.dev/weapons/";

const WeaponCard = ({ weapon }) => {
  return (
    <>
      <div className="weapon">
        <img
          src={WEAPON_API + deinitializeName(weapon.name) + "/icon"}
          alt={weapon.name}
        />

        <h3>{weapon.name}</h3>
      </div>
    </>
  );
};

export default WeaponCard;
