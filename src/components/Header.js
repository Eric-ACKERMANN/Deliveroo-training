import React from "react";
import Button from "./Button";

export default function Header({ img, alt, buttons, paddingLeft }) {
  return (
    <header>
      <div style={{ paddingLeft: paddingLeft }} className="container">
        <img src={img} alt={alt} />
        {buttons.map((element, index) => {
          return (
            <Button
              key={index}
              className={element.className}
              children={[...element.children]}
              handleClickButton={element.handleClickButton}
            />
          );
        })}
      </div>
    </header>
  );
}

Header.defaultProps = {
  img: "",
  alt: "",
  buttons: [],
  blockClass: ""
};
