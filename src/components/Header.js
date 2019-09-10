import React from "react";

function Header(props) {
  return (
    <header>
      <div className="header-centered">
        <img className="header-logo" src={props.img} alt={props.alt} />
      </div>
    </header>
  );
}

export default Header;
