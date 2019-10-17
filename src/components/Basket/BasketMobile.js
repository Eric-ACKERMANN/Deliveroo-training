import React from "react";
import Button from "../Button";
import BasketRecipeElement from "../Basket/BasketRecipeElement";
import BasketMealCard from "../Basket/BasketMealCard";
import Counter from "../Counter";

export default function BasketMobile({
  basket,
  price,
  modifyQuantity,
  setTips
}) {
  const { deliveryCost, operatingCost, rawPrice } = price;
  let quantity = setQuantity(basket);
  let totalPrice = setPrice(price);
  let svgSize = 15;
  let livraison = (
    <span>
      Frais de livraison
      <a href="*">Essayer gratuitement</a>
    </span>
  );
  return (
    <div className="basketMobile">
      <div className="basketMobile-upper">
        <div className="v-marg16">
          <span>Mon panier</span>
          <span>Logo d'une croix</span>
        </div>
        <ul className="v-marg16 basketMobile-basketMealCard">
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
            <a className="link-allergies" href="*">
              Précisez vos allergies
            </a>
          </li>
        </ul>
        <div className="basket-before-total v-marg16">
          <BasketRecipeElement
            title="Sous-Total"
            price={rawPrice ? rawPrice : 0}
          />
          <BasketRecipeElement title={livraison} price={deliveryCost} />
          <BasketRecipeElement title="Frais de Service" price={operatingCost} />
        </div>
      </div>
      <div className="basketMobile-lower">
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
          <BasketRecipeElement title="Total" price={totalPrice} />
        </div>
        <Button className="btn-active basketMobile-lower-btn v-marg16 pad8">
          <span className="basketMobile-lower-quantity">{quantity}</span>
          <span>Voir panier</span>
          <span>{`${totalPrice} €`}</span>
        </Button>
        <Button className="btn-cancel v-marg16 pad13 mt8">
          Retour au menu
        </Button>
      </div>
    </div>
  );
}

const setQuantity = basket => {
  let quantity = 0;
  if (basket) {
    basket.forEach(e => {
      return (quantity += e.quantity);
    });
  }
  return quantity;
};

const setPrice = price => {
  const { deliveryCost, operatingCost, rawPrice, tips } = price;
  let addedPrice =
    Number(deliveryCost) + Number(operatingCost) + Number(rawPrice) + tips;
  const totalPrice = addedPrice.toFixed(2).replace(".", ",");
  return totalPrice;
};
