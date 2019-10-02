import React from "react";
import Dish from "./Dish";

export default function Meals({ menu, dishes, setPopUp, activeMenu }) {
  return (
    <div id={`${menu}`} className={`meals`}>
      <p>{menu}</p>
      <div>
        {dishes.map((element, index) => {
          return <Dish key={index} dish={element} setPopUp={setPopUp} />;
        })}
      </div>
    </div>
  );
}
