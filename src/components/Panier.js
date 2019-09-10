import React from "react";
import QuantityButton from "./QuantityButton";

function Panier(props) {
  if (props.basket.length === 0) {
    return (
      <div className="panier-centered panier-sticky">
        <div className="panier-empty-button">
          <p>Valider mon panier</p>
        </div>
        <div class="panier-empty">
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
      <div className="panier-centered panier-sticky">
        <div className="panier-empty-button notEmpty">
          <p>Valider mon panier</p>
        </div>
        <div class="panier-quantite">
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
        <div class="panier-sous-total">
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
        <div class="panier-total">
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
