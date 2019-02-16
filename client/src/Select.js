import React from "react";

const Select = ({ changeVariable, value, children }) => {
  return (
    <select
      onChange={changeVariable}
      value={value}
      className="uk-button uk-form-select"
      data-uk-form-select
    >
      {children}
    </select>
  );
};

export default Select;
