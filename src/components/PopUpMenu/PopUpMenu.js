import React from "react";
import Header from "../Header";
import ClickListener from "./ClickListener.js";

export default function PopUpMenu({ cancelPopUpMenu, popUpMenu }) {
  const headerButtons = [
    {
      className: "btn-x",
      children: [<i className="fas fa-times" />],
      handleClickButton: cancelPopUpMenu
    }
  ];

  const bodyList = [
    {
      logo: <i className="far fa-user" />,
      text: ["Votre compte", "ackermanneric@gmail.com"]
    },
    {
      logo: <i className="fas fa-receipt" />,
      text: ["Historique de Commandes"]
    },
    {
      logo: <i className="fas fa-sign-out-alt"></i>,
      text: ["Déconnexion"]
    }
  ];

  let header = (
    <Header
      key={"popUpMenu-header"}
      img={
        "https://consumer-component-library.roocdn.com/11.3.1/static/images/logo-teal.64a39561252047a022e5ce0929c75374.svg"
      }
      alt={"Deliveroo logo"}
      buttons={headerButtons}
    />
  );

  let tools = (
    <ul key={"popUpMenu-tools"}>
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
  );

  let select = (
    <div key={"popUpMenu-select"} className="popUpMenu-select">
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
  );

  let insideMenu = [header, tools, select];
  let menu = popUpMenu.display ? (
    <ClickListener onClick={cancelPopUpMenu} className="flex-column height100">
      {insideMenu}
    </ClickListener>
  ) : (
    <div className="flex-column height100">{insideMenu}</div>
  );
  return (
    <div
      className={
        popUpMenu.display
          ? "popUp-container moves-in1"
          : "popUp-container no-visibility"
      }
    >
      <div
        className={
          popUpMenu.display ? "popUpMenu moves-in3" : "popUpMenu no-visibility"
        }
      >
        {menu}
      </div>
    </div>
  );
}
