// React
import React from "react";
// Components
import Day from "../components/Day";
import Form from "../components/Form";
import PopUp from "../components/PopUp";
// Redux
import { connect } from "react-redux";
import { pushToFavorites, deleteFavorite } from "../actions/favoriteActions";
import {
  getWeatherFetch,
  changeDegree,
  hideError
} from "../actions/weatherActions";

const Home = props => {
  const {
    fiveDaysWeather,
    cityName,
    cityKey,
    celsius,
    fahrenheit,
    favorites,
    isDataLoaded,
    isCelsius,
    err,
    showError
  } = props;
  let weatherText = fiveDaysWeather.Headline;
  let dailyForecasts = fiveDaysWeather.DailyForecasts;

  // takes date as number (EpochDate),
  // changes it to string and then slice it to 3 letters
  let dayName = date => {
    let dateString = new Date(date * 1000);
    return dateString.toString().slice(0, 3);
  };

  // gets city from the input and passes it to getWeatherFetch function
  const getWeather = async e => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    props.getWeatherFetch(city);
  };

  // passes data from the store to pushToFavorites function
  const addToFavorites = () => {
    props.pushToFavorites(cityName, celsius, favorites, cityKey);
  };

  // passes cityKey from the store to deleteFavorite function
  const removeFromFavorites = () => {
    props.deleteFavorite(cityKey);
  };

  // change degree from celsius to fahrenheit
  // and from fahrenheit to celsius
  const changeDegree = () => {
    props.changeDegree();
  };

  // shows spinning loading icon
  const preLoader = () => {
    return (
      <div>
        {
          <div className="center preLoader">
            <div>
              <strong>Loading</strong>
            </div>
            <div>
              <div className="preloader-wrapper big active">
                <div className="spinner-layer spinner-blue-only">
                  <div className="circle-clipper left">
                    <div className="circle"></div>
                  </div>
                  <div className="gap-patch">
                    <div className="circle"></div>
                  </div>
                  <div className="circle-clipper right">
                    <div className="circle"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    );
  };

  // closing the error popup
  const hideError = () => {
    props.hideError();
  };

  return (
    <div>
      {showError && <PopUp hideError={hideError} error={err} />}

      {isDataLoaded ? (
        <div className="container">
          <Form getWeather={getWeather} />

          <div>
            <div>
              <span>
                <h3>
                  {cityName}
                  <br />
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
                </h3>
              </span>
            </div>
            {favorites &&
            favorites.some(favorite => favorite.id === cityKey) ? (
              <div>
                <button
                  className="waves-effect waves-light btn-small red right"
                  onClick={removeFromFavorites}
                >
                  Remove From Favorites
                </button>
                <i className="material-icons right red-text">favorite</i>
              </div>
            ) : (
              <div>
                <button
                  className="waves-effect waves-light btn-small right"
                  onClick={addToFavorites}
                >
                  Add To Favorites
                </button>
                <i className="material-icons right">favorite_border</i>
              </div>
            )}

            <div className="switch">
              <label>
                <strong>Celsius</strong>
                <input type="checkbox" onClick={changeDegree} />
                <span className="lever" />
                <strong>Fahrenheit</strong>
              </label>
            </div>

            <h3 className="center-align">{weatherText && weatherText.Text}</h3>
            <div className="row">
              {dailyForecasts && isDataLoaded
                ? dailyForecasts.map((day, i) => {
                    return (
                      <div key={i} className="col s6 m4 l3 xl2 push-xl1">
                        <div className="card-panel center-align grey">
                          <h3>{dayName(day.EpochDate)}</h3> <br />
                          <Day day={day} isCelsius={isCelsius} />
                        </div>
                      </div>
                    );
                  })
                : preLoader()}
            </div>
          </div>
        </div>
      ) : (
        <div>{showError ? <div></div> : preLoader()}</div>
      )}
    </div>
  );
};

// turns state from the store to props
// so it can be useable in this component
const mapStateToProps = state => ({
  fiveDaysWeather: state.weather.fiveDays,
  cityKey: state.weather.cityKey,
  cityName: state.weather.cityName,
  favorites: state.favorite.favorites,
  celsius: state.weather.celsius,
  fahrenheit: state.weather.fahrenheit,
  isCelsius: state.weather.isCelsius,
  isDataLoaded: state.weather.isDataLoaded,
  err: state.weather.err,
  showError: state.weather.showError
});

// connect React to Redux
export default connect(
  mapStateToProps,
  { pushToFavorites, deleteFavorite, getWeatherFetch, changeDegree, hideError }
)(Home);
