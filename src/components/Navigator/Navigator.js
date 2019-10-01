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
  handleClickNavLink
}) {
  // const displayTitles = function(titles, className, id) {
  //   return titles.map((e, index) => {
  //     return (
  //       <a
  //         id={`${id}_${index}}`}
  //         className={className}
  //         onClick={() => handleClickNavLink(index)}
  //         href={`#${e}`}
  //         key={index}
  //       >
  //         {e}
  //       </a>
  //     );
  //   });
  // };
  console.log("navigator render");
  return (
    <nav>
      <div className="container navigator">
        <div className="leftBlock">
          <div id={`shownTitlesContainer`} className="shownTitles">
            {menuTitles.map((e, index) => {
              return (
                <a
                  onClick={event => handleClickNavLink(event.target.id, index)}
                  id={`shownTitles_${index}`}
                  key={index}
                  className={"nav-link"}
                  href={`#${e}`}
                >
                  {e}
                </a>
              );
            })}
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
