import React from "react";
import spinner from "../spinner.gif";
import PropTypes from "prop-types";

const Spinner = (props) => {
  return (
    <div className="text-center">
      <img
        src={spinner}
        alt="loading"
        style={{
          height: `${props.width}px`,
          width: `${props.width}px`,
        }}
      />
    </div>
  );
};

Spinner.propTypes = {
  width: PropTypes.number.isRequired,
};

Spinner.defaultProps = {
  width: 30,
};

export default Spinner;
