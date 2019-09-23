// Api Key
import { API_KEY } from "./constans";

// takes cityKey from store,
// fetching 5-day daily forecast and get current weather,
// gets the data and dispatch it to weatherReducer
const fiveDaysAndCurrentWeatherFetchs = (dispatch, cityKey) => {
  fetch(
    `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${
      cityKey
    }?apikey=${API_KEY}&language=en-us&details=true&metric=true`
  )
    .then(res => res.json())
    .then(data =>
      dispatch({
        type: "FETCH_FIVE_DAYS",
        payload: data
      })
    )
    .catch(err =>
      dispatch({
        type: "FETCH_FIVE_DAYS_ERROR",
        payload: err.message
      })
    )
    .then(
      fetch(
        `https://dataservice.accuweather.com/currentconditions/v1/${
          cityKey
        }?apikey=${API_KEY}&language=en-us&details=false`
      )
        .then(res => res.json())
        .then(data =>
          dispatch({
            type: "FETCH_CURRENT_WEATHER",
            payload: data[0].Temperature.Metric.Value
          })
        )
    )
    .catch(err =>
      dispatch({
        type: "FETCH_CURRENT_WEATHER_ERROR",
        payload: err.message
      })
    );
};

// gets position coords (latitude, longitude) and dispatch it to weatherReducer
// then takes latitude and longitude from store
// and fetching geo position search, 5-day daily forecast and get current weather
export const fetchCityWeather = () => (dispatch, getState) => {
  navigator.geolocation.getCurrentPosition(function(position) {
    dispatch({
      type: "GET_GEOLOCATION",
      payload: position.coords
    });
    fetch(
      `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${
        getState().weather.latitude
      },${
        getState().weather.longitude
      }&language=en-us&details=true&toplevel=false`
    )
      .then(res => res.json())
      .then(data => {
        fiveDaysAndCurrentWeatherFetchs(dispatch, data.Key);
        dispatch({
          type: "GEO_POSITION_SEARCH",
          payload: data
        })
      })
      .catch(err =>
        dispatch({
          type: "GEO_POSITION_SEARCH_ERROR",
          payload: err.message
        })
      );
  });
};

// takes city from the input,
// fetching location autocomplete and dispatch the data to weatherReducer
// then fetching 5-day daily forecast and get current weather
export const getWeatherFetch = city => (dispatch, getState) => {
  fetch(
    `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${city}&language=en-us`
  )
    .then(res => res.json())
    .then(data => {
      fiveDaysAndCurrentWeatherFetchs(dispatch, data[0].Key);
      dispatch({ type: "GET_WEATHER_FETCH", payload: data[0] })
    })
    .catch(err =>
      dispatch({
        type: "GET_WEATHER_FETCH_ERROR",
        payload: err.message
      })
    );
};

// takes celsius from store and dispatch it as action,payload
export const changeDegree = () => (dispatch, getState) => {
  try {
    let celsius = getState().weather.celsius;
    dispatch({
      type: "CHANGE_DEGREE",
      payload: celsius
    });
  } catch (err) {
    dispatch({
      type: "CHANGE_DEGREE_ERROR",
      payload: err.message
    });
  }
};

export const hideError = () => dispatch => {
  let showError = false;
  dispatch({
    type: "HIDE_ERROR",
    payload: showError
  });
};
