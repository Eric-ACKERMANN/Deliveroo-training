import React from "react";
import Dish from "./Dish";

export default function Meals({ menu, dishes, setPopUp, basket }) {
  let basketID = basket.map(e => {
    return e.id;
  });
  return (
    <div id={`${menu}`} className={`meals`}>
      <p>{menu}</p>
      <div>
        {dishes.map((element, index) => {
          let position = basketID.indexOf(element.id);
          return (
            <Dish
              key={index}
              dish={element}
              setPopUp={setPopUp}
              basketQuantity={position !== -1 ? basket[position].quantity : 0}
            />
          );
        })}
      </div>
    </div>
  );
}
