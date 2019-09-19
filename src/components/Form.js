import React, { Component } from "react";

class Form extends Component {
  render() {
    return (
      <form className="container" onSubmit={this.props.getWeather}>
        <input type="text" name="city" placeholder="City..."></input>
        <button
          className="btn waves-effect waves-light"
          type="submit"
          name="action"
        >
          Get Weather
          <i className="material-icons right">send</i>
        </button>
      </form>
    );
  }
}

export default Form;
