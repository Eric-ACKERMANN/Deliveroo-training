import React from "react";
import PopUpButton from "./PopUpButton";
import QuantityButton from "./QuantityButton";

function PopUpScreen(props) {
  const menuTitles = Object.keys(props.menus);

  // On récupère le plat qui est sélectionné
  let selectedPlate;

  for (let i = 0; i < menuTitles.length; i++) {
    for (let j = 0; j < props.menus[menuTitles[i]].length; j++) {
      if (props.menus[menuTitles[i]][j].id === props.popUpScreen.plateId) {
        selectedPlate = props.menus[menuTitles[i]][j];
        break;
      }
    }
  }

  return (
    props.popUpScreen.display === true && (
      <div>
        <div className="popUp-container" onClick={() => props.cancelClick()}>
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
              <p className="popUp-plate-description">
                {selectedPlate.description}
              </p>
              <div className="popUp-plate-quantity">
                <QuantityButton
                  type={"-"}
                  é
                  quantity={props.quantity}
                  quantityClick={q => props.quantityClick(q)}
                />
                <p className="popUp-plate-quantity">{props.quantity}</p>
                <QuantityButton
                  type={"+"}
                  quantityClick={q => props.quantityClick(q)}
                />
              </div>
            </div>
            <div className="popUp-plate-lower">
              <PopUpButton
                value={"Annuler"}
                cancelClick={() => props.cancelClick()}
              />
              <PopUpButton
                value={"Total"}
                quantity={props.quantity}
                price={Number(selectedPlate.price).toFixed(2)}
                plateValidation={() => props.plateValidation(selectedPlate)}
              />
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default PopUpScreen;
