import React from "react";
import Meals from "./Meals";
import Navigator from "./Navigator";

export default function Menu({ menus, setPopUp, basket }) {
  const menuTitles = Object.keys(menus);

  return (
    <div className="menu-background">
      <Navigator menuTitles={menuTitles} basket={basket} />
      <div className="menu-centered">
        <div className="menu-left">
          {menuTitles.map((menuTitle, index) => {
            return (
              <Meals
                key={index}
                menuTitle={menuTitle}
                dishes={menus[menuTitle]}
                setPopUp={setPopUp}
              />
            );
          })}
          ;
        </div>
        <div className="menu-right" />
      </div>
    </div>
  );
}
