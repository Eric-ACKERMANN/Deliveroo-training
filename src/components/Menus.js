import React from "react";
import Plates from "./Plates";
import Navigator from "./Navigator";

function MenuType(props) {
  const menuTitles = Object.keys(props.menus);

  return (
    <div className="menu-background">
      <Navigator menuTitles={menuTitles} basket={props.basket} />
      <div className="menu-centered">
        <div className="menusType">
          {menuTitles.map(menuTitle => {
            return (
              <Plates
                menuTitle={menuTitle}
                plates={props.menus[menuTitle]}
                popUp={id => props.popUp(id)}
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

export default MenuType;
