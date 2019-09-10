import React from "react";
import Button from "./Button";

export default function Header({ img, alt, setPopUpMenu }) {
  return (
    <header>
      <div className="container">
        <img src={img} alt={alt} />
        <Button className="nav-btn">
          <i class="fas fa-shopping-basket" />
          <span>0,00 €</span>
        </Button>
        <Button handleClickButton={setPopUpMenu} className="nav-btn">
          <i class="fas fa-bars" />
          <span>Menu</span>
        </Button>
      </div>
    </header>
  );
}
