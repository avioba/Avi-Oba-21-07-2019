import React, { Component } from "react";

class Day extends Component {
  render() {
    let celsius = this.props.day.Temperature.Maximum.Value;
    // fahrenheit formula
    let fahrenheit = celsius * 1.8 + 32;
    let isCelsius = this.props.isCelsius;
    return (
      <div>
        <h4>
          {isCelsius ? (
            <span>
              {celsius}
              <span>&deg;c</span>
            </span>
          ) : (
            <span>
              {fahrenheit.toFixed(1)}
              <span>&deg;f</span>
            </span>
          )}
        </h4>
      </div>
    );
  }
}

export default Day;
