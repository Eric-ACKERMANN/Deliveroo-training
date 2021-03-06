import React from "react";

export default function Dish({ dish, setPopUp, basketQuantity }) {
  let title;
  if (basketQuantity) {
    title = (
      <p className="plate-title">
        <span className="plate-basketQuantity">{`${basketQuantity}x`}</span>
        <span>{dish.title}</span>
      </p>
    );
  } else {
    title = <p className="plate-title">{dish.title}</p>;
  }

  let activDish = basketQuantity === 0 ? "plate-animation-shrink" : "";
  return (
    <div className="plate-container" onClick={() => setPopUp(dish)}>
      <div className={`plate-animation ${activDish}`} />

      <div className="plate-description-div">
        {title}

        {dish.description ? (
          <p className="plate-description">
            {`${dish.description}`}{" "}
            <span className="plate-description-separator">-</span>{" "}
            {`${dish.price} €`}
          </p>
        ) : (
          <p className="plate-description">
            <span className="plate-price">{`${dish.price} €`}</span>
          </p>
        )}

        <p className="plate-price-popular-div">
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
