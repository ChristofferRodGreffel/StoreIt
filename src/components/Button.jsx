import React from "react";

export const Button = (props) => {
  return (
    <button type={props.type} className="btnComponent">
      {props.content}
    </button>
  );
};
