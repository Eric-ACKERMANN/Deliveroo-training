import React from "react";
import Panier from "./Panier";

function Navigator(props) {
  return (
    <nav className="nav-sticky">
      <div className="container-nav">
        <ul className="nav-list">
          <li>
            <a href={`#${props.menuTitles[0]}`}>{props.menuTitles[0]}</a>
          </li>
          <li>
            <a href={`#${props.menuTitles[1]}`}>{props.menuTitles[1]}</a>
          </li>
          <li>
            <a href={`#${props.menuTitles[2]}`}>{props.menuTitles[2]}</a>
          </li>
          <li>
            <a href={`#${props.menuTitles[3]}`}>{props.menuTitles[3]}</a>
          </li>
        </ul>
        <div className="nav-right">
          <Panier basket={props.basket} />
        </div>
      </div>
    </nav>
  );
}

export default Navigator;
