// React
import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
// CSS File
import "./App.css";
// Component
import Navbar from "./components/Navbar";
// Containers
import Weather from "./containers/Weather";
import Favorites from "./containers/Favorites";
// Redux
import { connect } from "react-redux";
import { fetchCityWeather } from "./actions/weatherActions";

class App extends Component {
  componentWillMount() {
    this.props.fetchCityWeather();
  }

  render() {
    const MyWeatherPage = () => {
      return <Weather />;
    };

    const MyFavoritesPage = () => {
      return <Favorites />;
    };

    return (
      <BrowserRouter>
        <Navbar />
        <Route exact path="/" render={MyWeatherPage} />
        <Route path="/favorites" render={MyFavoritesPage} />
      </BrowserRouter>
    );
  }
}

export default connect(
  null,
  { fetchCityWeather }
)(App);
