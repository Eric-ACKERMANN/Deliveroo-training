import React from "react";
import Header from "../Header";
import ClickListener from "./ClickListener.js";

export default function PopUpMenu({ cancelPopUpMenu }) {
  const headerButtons = [
    {
      className: "x-btn",
      children: [<i class="fas fa-times" />],
      handleClickButton: cancelPopUpMenu
    }
  ];

  const bodyList = [
    {
      logo: <i class="far fa-user" />,
      text: ["Votre compte", "ackermanneric@gmail.com"]
    },
    {
      logo: <i class="fas fa-receipt" />,
      text: ["Historique de Commandes"]
    },
    {
      logo: <i class="fas fa-sign-out-alt"></i>,
      text: ["Déconnexion"]
    }
  ];
  return (
    <div className="popUp-container">
      <ClickListener onClick={cancelPopUpMenu} className="popUpMenu">
        <Header
          img={
            "https://consumer-component-library.roocdn.com/11.3.1/static/images/logo-teal.64a39561252047a022e5ce0929c75374.svg"
          }
          alt={"Deliveroo logo"}
          buttons={headerButtons}
        />
        <ul>
          {bodyList.map((element, index) => {
            return (
              <li key={index}>
                <div>{element.logo}</div>
                <div>
                  {element.text.map((e, index) => {
                    return <span key={index}>{e}</span>;
                  })}
                </div>
              </li>
            );
          })}
        </ul>
        <div className="popUpMenu-select">
          <select>
            <option>Français</option>
            <option>English</option>
          </select>
          <select>
            <option>Allemagne</option>
            <option>Australie</option>
            <option>France</option>
            <option>Belgique</option>
            <option>Espagne</option>
            <option>Irlande</option>
          </select>
        </div>
      </ClickListener>
    </div>
  );
}
