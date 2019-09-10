import React from "react";
import Header from "../Header";
import ClickListener from "./ClickListener.js";

export default function PopUpMenu({ setCancel }) {
  return (
    <div className="popUp-container">
      <ClickListener onClick={setCancel}>
        <Header />
        <ul>
          <li>
            <div>
              <i class="fas fa-shopping-basket" />
            </div>
            <div>
              <span>Votre compte</span>
              <span>ackermanneric@gmail.com</span>
            </div>
          </li>
          <li>
            <div>
              <i class="fas fa-shopping-basket" />
            </div>
            <div>
              <span>Votre compte</span>
              <span>ackermanneric@gmail.com</span>
            </div>
          </li>
          <li>
            <div>
              <i class="fas fa-shopping-basket" />
            </div>
            <div>
              <span>Votre compte</span>
              <span>ackermanneric@gmail.com</span>
            </div>
          </li>
          <li>
            <div>
              <i class="fas fa-shopping-basket" />
            </div>
            <div>
              <span>Votre compte</span>
              <span>ackermanneric@gmail.com</span>
            </div>
          </li>
        </ul>
        <div>
          <select>hey</select>
          <select>yo</select>
        </div>
      </ClickListener>
    </div>
  );
}
