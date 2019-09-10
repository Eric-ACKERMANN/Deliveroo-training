import React from "react";

export default function Dish({ dish, setPopUp }) {
  return (
    <div className="plate-container" onClick={() => setPopUp(dish)}>
      <div className="plate-description-div">
        <p className="plate-title">{dish.title}</p>
        <p className="plate-description">{dish.description}</p>
        <p className="plate-price-popular-div">
          <span className="plate-price">{`${dish.price} €`}</span>
          {dish.popular && (
            <span className="plate-populaire">
              <i id="star-logo" className="fas fa-star" />
              Populaire
            </span>
          )}
        </p>
      </div>

      {dish.picture && (
        <div className="plate-logo-div">
          <img
            className="plate-logo"
            src={dish.picture}
            alt={`${dish.title}`}
          />
        </div>
      )}
    </div>
  );
}
