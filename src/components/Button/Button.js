import React from "react";

export default function Button({ className, children, handleClickButton }) {
  return (
    <button onClick={() => handleClickButton()} className={className}>
      {children}
    </button>
  );
}

Button.defaultProps = {
  className: "",
  children: "This Button has no Name",
  handleClickButton: function() {
    return false;
  }
};
