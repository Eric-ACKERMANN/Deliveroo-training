import React from "react";
import Button from "../Button";

export default function BasketEmpty(props) {
  return (
    <div className="basket">
      <div className="basket-container">
        <Button className="btn-inactive basket-button">
          Valider mon panier
        </Button>
        <div className="basket-empty">
          <p>Votre panier est vide</p>
        </div>
      </div>
    </div>
  );
}
