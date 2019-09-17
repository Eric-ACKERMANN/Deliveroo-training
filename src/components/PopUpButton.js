import React from "react";

function PopUpButton(props) {
  let totalPrice = Number(props.quantity) * Number(props.price);
  if (props.value === "Annuler") {
    return (
      <div className="cancelButton" onClick={() => props.cancelClick()}>
        {props.value}
      </div>
    );
  } else {
    return (
      <div className="totalButton" onClick={() => props.plateValidation()}>
        {`${props.value} ${totalPrice.toFixed(2)} €`}
      </div>
    );
  }
}

export default PopUpButton;
