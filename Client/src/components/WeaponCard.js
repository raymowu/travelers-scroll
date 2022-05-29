import React from "react";
import "../css/weaponcard.css";
import deinitializeName from "./DeinitializeName";
const WEAPON_API = "https://api.genshin.dev/weapons/";

const WeaponCard = ({ weapon, weaponHandleOnClick }) => {
  return (
    <>
      <div className="weapon">
        <img
          src={WEAPON_API + deinitializeName(weapon.name) + "/icon"}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://api.genshin.dev/weapons/dull-blade/icon";
          }}
          onClick={() => weaponHandleOnClick(weapon)}
          alt={weapon.name}
        />

        <h3>{weapon.name}</h3>
      </div>
    </>
  );
};

export default WeaponCard;
