import React from "react";

function QuantityButton(props) {
  return (
    <div class="increase" data-reactid=".f.0.0.0.1.0.0">
      {props.type === "+" && (
        <svg
          className="popUp-quantity-button"
          onClick={event => {
            if (props.type === "-") {
              if (props.quantity > 1) {
                props.quantityClick(-1);
              }
            }
            if (props.type === "+") {
              props.quantityClick(1);
            }
          }}
          width="22"
          height="22"
          viewBox="0 0 16 16"
          data-reactid=".f.0.0.0.1.0.0.0"
        >
          <g fill="#00CCBC">
            <rect width="1.091" height="8.727" x="7.455" y="3.636" rx=".545" />
            <rect
              width="1.091"
              height="8.727"
              x="7.455"
              y="3.636"
              transform="rotate(90 8 8)"
              rx=".545"
            />
            <path d="M1.35,8 C1.35,11.6725489 4.32745108,14.65 8,14.65 C11.6725489,14.65 14.65,11.6725489 14.65,8 C14.65,4.32745108 11.6725489,1.35 8,1.35 C4.32745108,1.35 1.35,4.32745108 1.35,8 Z M0,8 C0,3.58186667 3.58186667,0 8,0 C12.4181333,0 16,3.58186667 16,8 C16,12.4181333 12.4181333,16 8,16 C3.58186667,16 0,12.4181333 0,8 Z" />
          </g>
        </svg>
      )}
      {props.type === "-" && (
        <svg
          className="popUp-quantity-button"
          onClick={event => {
            if (props.type === "-") {
              if (props.quantity > 1) {
                props.quantityClick(-1);
              }
            }
            if (props.type === "+") {
              props.quantityClick(1);
            }
          }}
          width="22"
          height="22"
          viewBox="0 0 16 16"
        >
          <g fill="#00CCBC">
            <rect
              width="1.091"
              height="8.727"
              x="7.455"
              y="3.636"
              transform="rotate(90 8 8)"
              rx=".545"
            />
            <path d="M1.35,8 C1.35,11.6725489 4.32745108,14.65 8,14.65 C11.6725489,14.65 14.65,11.6725489 14.65,8 C14.65,4.32745108 11.6725489,1.35 8,1.35 C4.32745108,1.35 1.35,4.32745108 1.35,8 Z M0,8 C0,3.58186667 3.58186667,0 8,0 C12.4181333,0 16,3.58186667 16,8 C16,12.4181333 12.4181333,16 8,16 C3.58186667,16 0,12.4181333 0,8 Z" />
          </g>
        </svg>
      )}
    </div>
  );
}

export default QuantityButton;
