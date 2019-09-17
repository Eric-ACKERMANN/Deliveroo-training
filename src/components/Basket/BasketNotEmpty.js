import React from "react";
import BasketRecipeElement from "./BasketRecipeElement";
import BasketMealCard from "./BasketMealCard";
import Button from "../Button";
import Counter from "../Counter";

export default function BasketNotEmpty({
  basket,
  price,
  modifyQuantity,
  setTips
}) {
  const { deliveryCost, operatingCost, rawPrice, tips } = price;
  let livraison = (
    <span>
      Frais de livraison
      <a href="*">Essayer gratuitement</a>
    </span>
  );
  let svgSize = 15;
  let totalPrice =
    Number(deliveryCost) + Number(operatingCost) + Number(rawPrice) + tips;
  return (
    <div className="basket">
      <div className="basket-container">
        <Button className="btn-active basket-button">Valider mon panier</Button>
        <ul>
          {basket.map((element, index) => {
            return (
              <BasketMealCard
                key={index}
                quantity={element.quantity}
                unitPrice={element.price}
                title={element.title}
                svg={{ height: svgSize, width: svgSize }}
                modifyQuantity={modifyQuantity}
                idItem={element.id}
              />
            );
          })}

          <li>
            <a href="*">Précisez vos allergies</a>
          </li>
        </ul>
        <div className="basket-before-total">
          <BasketRecipeElement title="Sous-Total" price={rawPrice} />
          <BasketRecipeElement title={livraison} price={deliveryCost} />
          <BasketRecipeElement title="Frais de Service" price={operatingCost} />
        </div>
      </div>
      <div className="basket-total">
        <BasketRecipeElement
          title="Pourboir livreur"
          price={price.tips.toFixed(2)}
        >
          <Counter
            svg={{ height: svgSize, width: svgSize }}
            quantityClick={setTips}
            quantity={price.tips}
            tips={true}
          />
        </BasketRecipeElement>
        <BasketRecipeElement
          title="Total"
          price={Number(totalPrice).toFixed(2)}
        />
      </div>
    </div>
  );
}
