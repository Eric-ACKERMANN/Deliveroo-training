import React from "react";

export default function BasketRecipeElement({
  title,
  children,
  price,
  className
}) {
  return (
    <div className={`basket-recipe-element ${className}`}>
      <span>{title}</span>
      <span>{children}</span>
      <span>{price.toString().replace(".", ",")} €</span>
    </div>
  );
}
