import React from "react";
import PropTypes from "prop-types";

export const TextInput = ({ label, value, onChange }) => {
  return (
    <span className="mr-2 items-center text-lg font-semibold text-emerald-900 ">
      <label className="block mb-1 text-emerald-900">{label}</label>
      <input
        className="shadow appearance-none border rounded w-30 py-2 px-3 text-emerald-900 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </span>
  );
};

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
