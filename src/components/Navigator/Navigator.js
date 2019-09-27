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
  hiddenTitles,
  navDropDown,
  toggleDropDown,
  handleClickNavLink
}) {
  return (
    <nav>
      <div className="container navigator">
        <div className="leftBlock">
          <div id={`shownTitlesContainer`} className="shownTitles">
            {menuTitles.map((e, index) => {
              return (
                <a
                  onClick={() => handleClickNavLink(index)}
                  id={`shownTitles_${index}`}
                  key={index}
                  className={
                    positionOfWindow === index
                      ? "nav-link nav-selected"
                      : "nav-link nav-unselected"
                  }
                  href={`#${e}`}
                >
                  {e}
                </a>
              );
            })}
          </div>

          <div id={`hiddenTitles`} className="hiddenTitlesBlock">
            <div
              onClick={toggleDropDown}
              className={
                positionOfWindow >= menuTitles.length
                  ? "nav-link nav-selected test"
                  : "nav-link nav-unselected test"
              }
            >
              <span>
                {positionOfWindow >= menuTitles.length
                  ? hiddenTitles[positionOfWindow - menuTitles.length]
                  : "Plus"}
              </span>
              <i className="fas fa-chevron-down" />
            </div>
            {navDropDown && (
              <ClickListener
                className="hiddenTitles-dropdown"
                onClick={toggleDropDown}
                listenInside={true}
              >
                {hiddenTitles.map((e, index) => {
                  return (
                    <a
                      onClick={() =>
                        handleClickNavLink(menuTitles.length + index)
                      }
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
