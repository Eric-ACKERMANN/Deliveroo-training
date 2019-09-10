import React from "react";

function Restaurant(props) {
  return (
    <div className="restaurant-centered">
      <div className="restaurant-blocDescription">
        <h2 className="restaurant-titre">{props.name}</h2>
        <p className="restaurant-description">{props.description}</p>
      </div>
      <div className="test">
        <img className="restaurant-logo" src={props.img} alt={props.alt} />
      </div>
    </div>
  );
}

export default Restaurant;
