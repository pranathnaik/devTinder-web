import React from "react";

const Alert = ({ errorMessage }) => {
  return (
    errorMessage && (
      <div className="toast">
        <div className="alert alert-info">
          <span>{errorMessage}</span>
        </div>
      </div>
    )
  );
};

export default Alert;
