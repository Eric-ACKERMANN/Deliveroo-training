import React from "react";
import QuantityButton from "./QuantityButton";

export default function Counter({
  className,
  quantityClick,
  children,
  quantity,
  svg,
  idItem,
  tips
}) {
  return (
    <div className={`counter ${className}`}>
      <QuantityButton
        type="-"
        quantityClick={quantityClick}
        quantity={quantity}
        height={svg.height}
        width={svg.width}
        idItem={idItem}
        tips={tips}
      />
      <span>{children}</span>
      <QuantityButton
        type="+"
        quantityClick={quantityClick}
        height={svg.height}
        width={svg.width}
        idItem={idItem}
      />
    </div>
  );
}
