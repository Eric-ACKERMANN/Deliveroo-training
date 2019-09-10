import React from "react";
import PopUpButton from "./PopUpButton";
import QuantityButton from "./QuantityButton";

export default function PopUp({
  plateId,
  menus,
  quantity,
  setQuantity,
  setCancel,
  setValidation
}) {
  const menuTitles = Object.keys(menus);

  // On récupère le plat qui est sélectionné
  let selectedPlate;

  for (let i = 0; i < menuTitles.length; i++) {
    for (let j = 0; j < menus[menuTitles[i]].length; j++) {
      if (menus[menuTitles[i]][j].id === plateId) {
        selectedPlate = menus[menuTitles[i]][j];
        break;
      }
    }
  }

  return (
    <div className="popUp-container">
      <div className="popUp-plate-container">
        <div className="popUp-plate-upper">
          {selectedPlate.picture && (
            <img
              className="popUp-plate-image"
              src={selectedPlate.picture}
              alt={`${selectedPlate.title}`}
            />
          )}
          <p className="popUp-plate-title">{selectedPlate.title}</p>
          <p className="popUp-plate-description">{selectedPlate.description}</p>
          <div className="popUp-plate-quantity">
            <QuantityButton
              type={"-"}
              é
              quantity={quantity}
              quantityClick={e => setQuantity(e)}
            />
            <p className="popUp-plate-quantity">{quantity}</p>
            <QuantityButton type={"+"} quantityClick={e => setQuantity(e)} />
          </div>
        </div>
        <div className="popUp-plate-lower">
          <PopUpButton value={"Annuler"} cancelClick={() => setCancel()} />
          <PopUpButton
            value={"Total"}
            quantity={quantity}
            price={Number(selectedPlate.price).toFixed(2)}
            plateValidation={() => setValidation(selectedPlate)}
          />
        </div>
      </div>
    </div>
  );
}
