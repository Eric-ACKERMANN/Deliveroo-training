import React from "react";
import Dish from "./Dish";

export default function Meals({ menuTitle, dishes, setPopUp }) {
  return (
    <div id={`${menuTitle}`} className="meals">
      <p>{menuTitle}</p>
      <div>
        {dishes.map((element, index) => {
          return <Dish key={index} dish={element} setPopUp={setPopUp} />;
        })}
      </div>
    </div>
  );
}
