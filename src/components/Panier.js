import React from "react";
import QuantityButton from "./QuantityButton";
import Button from "./Button";

function Panier(props) {
  if (props.basket.length === 0) {
    return (
      <div className="panier">
        <Button className="btn-inactive">Valider mon panier</Button>
        <div className="panier-empty">
          <p>Votre panier est vide</p>
        </div>
      </div>
    );
  } else {
    let somme = 0;
    for (let i = 0; i < props.basket.length; i++) {
      somme = somme + Number(props.basket[i].price);
    }
    return (
      <div className="panier">
        <Button className="btn-active">Valider mon panier</Button>
        <div className="panier-quantite">
          <div>
            {props.basket.map(element => {
              return (
                <div className="basket-element">
                  <QuantityButton type="-" />
                  <p>{element.quantity}</p>
                  <QuantityButton type="+" />
                  <p>{element.title}</p>
                  <p>{`${(element.quantity * Number(element.price)).toFixed(
                    2
                  )} €`}</p>
                </div>
              );
            })}
          </div>
          <a href="*">Précisez vos allergies</a>
        </div>
        <div className="panier-sous-total">
          <div>
            <span>Sous-Total</span>
            <span>{`${somme} €`}</span>
          </div>
          <div>
            <span>Frais de livraison</span>
            <span>
              <a href="*">Essayer gratuitement</a>
            </span>
            <span>2,75 €</span>
          </div>
        </div>
        <div className="panier-total">
          <div>
            <div>Pourboir livreur</div>
            <QuantityButton type="-" />
            <QuantityButton type="+" />
          </div>
          <div>
            <span>Total</span>
            <span>Prix total</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Panier;
