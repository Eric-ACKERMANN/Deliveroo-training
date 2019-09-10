import React from "react";

function PopUpButton(props) {
  let totalPrice = props.quantity * Number(props.price).toFixed(2);
  if (props.value === "Annuler") {
    return (
      <div className="cancelButton" onClick={() => props.cancelClick()}>
        {props.value}
      </div>
    );
  } else {
    return (
      <div className="totalButton" onClick={() => props.plateValidation()}>
        {`${props.value} ${totalPrice} €`}
      </div>
    );
  }
}

export default PopUpButton;
