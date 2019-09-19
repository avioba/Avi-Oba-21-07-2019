import React from "react";

const popup = props => {
  return (
    <div className="overlay">
      <div className="popup">
        <h4 className="center">Error</h4>
        <hr />
        <div className="center">
          <p>{props.error}</p>
          <button
            className="waves-effect waves-light btn-small red"
            onClick={props.hideError}
          >
            O.K.
          </button>
        </div>
      </div>
    </div>
  );
};

export default popup;
