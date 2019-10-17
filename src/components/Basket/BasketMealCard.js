import React from "react";
import Counter from "../Counter";

export default function({
  quantity,
  title,
  unitPrice,
  svg,
  modifyQuantity,
  idItem,
  className
}) {
  return (
    <li className={`basket-mealcard ${className}`}>
      <Counter
        svg={svg}
        quantityClick={modifyQuantity}
        idItem={idItem}
        quantity={quantity}
      >
        {quantity}
      </Counter>
      <span>{title}</span>
      <span>{`${(Number(unitPrice) * quantity)
        .toFixed(2)
        .toString()
        .replace(".", ",")} €`}</span>
    </li>
  );
}
