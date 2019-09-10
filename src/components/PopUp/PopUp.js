import React from "react";
import PopUpButton from "../PopUpButton";
import QuantityButton from "../QuantityButton";
import ClickListener from "./ClickListener";

export default function PopUp({
  dish,
  quantity,
  setQuantity,
  togglePopUp,
  setValidation
}) {
  return (
    <div className="popUp-container">
      <ClickListener className="popUp-plate-container" onClick={togglePopUp}>
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
          <div className="popUp-plate-quantity">
            <QuantityButton
              type={"-"}
              quantity={quantity}
              quantityClick={e => setQuantity(e)}
            />
            <p className="popUp-plate-quantity">{quantity}</p>
            <QuantityButton type={"+"} quantityClick={e => setQuantity(e)} />
          </div>
        </div>
        <div className="popUp-plate-lower">
          <PopUpButton value={"Annuler"} cancelClick={() => togglePopUp()} />
          <PopUpButton
            value={"Total"}
            quantity={quantity}
            price={Number(dish.price).toFixed(2)}
            plateValidation={() => setValidation(dish)}
          />
        </div>
      </ClickListener>
    </div>
  );
}
