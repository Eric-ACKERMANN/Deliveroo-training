import React from "react";

function Restaurant(props) {
  return (
    <div className="container restaurant">
      <div className="leftBlock">
        <h2>{props.name}</h2>
        <p>{props.description}</p>
      </div>
      <div className="rightBlock">
        <img src={props.img} alt={props.alt} />
      </div>
    </div>
  );
}

export default Restaurant;
