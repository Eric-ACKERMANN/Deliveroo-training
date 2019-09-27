import React from "react";
import PopUpButton from "../PopUpButton";

import ClickListener from "../ClickListener";
import Counter from "../Counter";

export default function PopUp({
  dish,
  quantity,
  setQuantity,
  togglePopUp,
  setValidation,
  popUpDisplayBoolean
}) {
  return (
    <div
      className={
        popUpDisplayBoolean
          ? "popUp-container moves-in1"
          : "popUp-container no-visibility"
      }
    >
      <div
        className={
          popUpDisplayBoolean
            ? "popUp-plate-container moves-in2"
            : "popUp-plate-container no-visibility"
        }
      >
        {popUpDisplayBoolean && (
          <ClickListener onClick={togglePopUp}>
            <div className="popUp-plate-upper">
              {dish.picture && (
                <img
                  className="popUp-plate-image"
                  src={dish.picture}
                  alt={`${dish.title}`}
                />
              )}
              <p className="popUp-plate-title">{dish.title}</p>
              <p className="popUp-plate-description">{dish.description}</p>
              <Counter
                className="popUp-plate-quantity"
                quantityClick={setQuantity}
                quantity={quantity}
                svg={{ height: 22, width: 22 }}
              >
                {quantity}
              </Counter>
            </div>
            <div className="popUp-plate-lower">
              <PopUpButton
                value={"Annuler"}
                cancelClick={() => togglePopUp()}
              />
              <PopUpButton
                value={"Total"}
                quantity={quantity}
                price={Number(dish.price).toFixed(2)}
                plateValidation={() => setValidation(dish)}
              />
            </div>
          </ClickListener>
        )}
      </div>
    </div>
  );
}
