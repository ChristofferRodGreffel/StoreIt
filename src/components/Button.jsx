import React from "react";

export const Button = (props) => {
  return (
    <button type={props.type} className="btnComponent" onClick={props.function}>
      {props.content}
    </button>
  );
};
