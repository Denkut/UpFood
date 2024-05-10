import React from "react";
import PropTypes from "prop-types";

export const NumberInput = ({ label, value, onChange, suffix }) => {
  return (
    <span className="mr-2 items-center text-lg font-semibold text-emerald-900 ">
      <label className="block mb-1 text-gray-500">{label}</label>
      <input
        className="shadow appearance-none border rounded w-30 py-2 px-3 text-emerald-900 leading-tight focus:outline-none focus:shadow-outline"
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {suffix}
    </span>
  );
};

NumberInput.propTypes = {
  label: PropTypes.string.isRequired,
  suffix: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
};
