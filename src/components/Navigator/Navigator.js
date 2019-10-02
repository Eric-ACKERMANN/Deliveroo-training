import React from "react";
import BasketNotEmpty from "../Basket/BasketNotEmpty";
import BasketEmpty from "../Basket/BasketEmpty";
import ClickListener from "../ClickListener";

export default function Navigator({
  menuTitles,
  basket,
  price,
  modifyQuantity,
  setTips,
  positionOfWindow,
  navDropDown,
  toggleDropDown,
  handleClickNavLink,
  activeMenu
}) {
  const renderItems = () => {
    return menuTitles.map((menu, index) => {
      const activeClass = activeMenu === menu ? "nav-selected" : "";
      return (
        <a
          onClick={() => handleClickNavLink(index)}
          id={`shownTitles_${index}`}
          key={index}
          className={`nav-link ${activeClass}`}
          href={`#${menu}`}
        >
          {menu}
        </a>
      );
    });
  };
  return (
    <nav>
      <div className="container navigator">
        <div className="leftBlock">
          <div id={`shownTitlesContainer`} className="shownTitles">
            {renderItems()}
          </div>

          <div id={`hiddenTitles`} className="hiddenTitlesBlock">
            <div
              id={`hiddenTitles-nav-element`}
              onClick={toggleDropDown}
              className={
                positionOfWindow >= menuTitles.length
                  ? "nav-link nav-selected test"
                  : "nav-link nav-unselected test"
              }
            >
              <span id={"loli"}>Plus</span>
              <i className="fas fa-chevron-down" />
            </div>
            {navDropDown && (
              <ClickListener
                className="hiddenTitles-dropdown"
                onClick={toggleDropDown}
                listenInside={true}
              >
                {menuTitles.map((e, index) => {
                  return (
                    <a
                      id={`hiddenTitles_${index}`}
                      className={"hiddenTitles-element"}
                      onClick={() => handleClickNavLink(index)}
                      href={`#${e}`}
                      key={index}
                    >
                      {e}
                    </a>
                  );
                })}
              </ClickListener>
            )}
          </div>
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
