import React from "react";
import BasketNotEmpty from "./Basket/BasketNotEmpty";
import BasketEmpty from "./Basket/BasketEmpty";

function Navigator({ menuTitles, basket, price, modifyQuantity, setTips }) {
  return (
    <nav>
      <div className="container navigator">
        <div className="leftBlock">
          <ul className="nav-list">
            <li>
              <a href={`#${menuTitles[0]}`}>{menuTitles[0]}</a>
            </li>
            <li>
              <a href={`#${menuTitles[1]}`}>{menuTitles[1]}</a>
            </li>
            <li>
              <a href={`#${menuTitles[2]}`}>{menuTitles[2]}</a>
            </li>
            <li>
              <a href={`#${menuTitles[3]}`}>{menuTitles[3]}</a>
            </li>
          </ul>
        </div>
        <div className="rightBlock">
          {basket.length > 0 ? (
            <BasketNotEmpty
              basket={basket}
              price={price}
              modifyQuantity={modifyQuantity}
              setTips={setTips}
            />
          ) : (
            <BasketEmpty />
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navigator;
