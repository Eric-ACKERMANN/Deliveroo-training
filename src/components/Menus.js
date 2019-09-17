import React from "react";
import Meals from "./Meals";
import Navigator from "./Navigator";

export default function Menu({
  menus,
  setPopUp,
  basket,
  price,
  modifyQuantity,
  setTips
}) {
  const menuTitles = Object.keys(menus);

  return (
    <div className="menuBlock">
      <Navigator
        menuTitles={menuTitles}
        basket={basket}
        price={price}
        modifyQuantity={modifyQuantity}
        setTips={setTips}
      />
      <div className="container menu">
        <div className="leftBlock">
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
        <div className="rightBlock" />
      </div>
    </div>
  );
}
