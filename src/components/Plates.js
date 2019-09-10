import React from "react";

function Plates(props) {
  return (
    <div id={`${props.menuTitle}`} className="menuType-container">
      <div className="scrolling-test" />
      <p className="menuType-title">{props.menuTitle}</p>
      <div className="plate-list">
        {props.plates.map(element => {
          return (
            // when plate-container is clicked, it pops up a window with the plate
            <div
              className="plate-container"
              onClick={event => props.popUpScreen(element.id)}
            >
              <div className="plate-description-div">
                <p className="plate-title">{element.title}</p>
                <p className="plate-description">{element.description}</p>
                <p className="plate-price-popular-div">
                  <span className="plate-price">{`${element.price} €`}</span>
                  {element.popular && (
                    <span className="plate-populaire">
                      <i id="star-logo" class="fas fa-star" />
                      Populaire
                    </span>
                  )}
                </p>
              </div>

              {element.picture && (
                <div className="plate-logo-div">
                  <img
                    className="plate-logo"
                    src={element.picture}
                    alt={`${element.title}`}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Plates;
