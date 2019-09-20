// Api Key
import { API_KEY } from "./constans";

// takes data from store and dispatch it to favoriteReducer
export const pushToFavorites = (
  city,
  tlvTemperature,
  favorites,
  cityKey
) => dispatch => {
  try {
    if (city && tlvTemperature) {
      const favorite = { id: cityKey, city: city, temperature: tlvTemperature };
      dispatch({
        type: "ADD_FAVORITE",
        payload: favorite
      });
    }
  } catch (err) {
    dispatch({
      type: "ADD_FAVORITE_ERROR",
      payload: err.message
    });
  }
};

// takes city key from favorite city and dispatch it to favoriteReducer
export const deleteFavorite = cityKey => dispatch => {
  try {
    dispatch({
      type: "DELETE_FAVORITE",
      payload: cityKey
    });
  } catch (err) {
    dispatch({
      type: "DELETE_FAVORITE_ERROR",
      payload: err.message
    });
  }
};

// takes city and city key from selected favorite
// fetching location autocomplete and dispatch the data to weatherReducer
// then fetching 5-day daily forecast and get current weather
export const goToFavorite = (cityKey, city) => dispatch => {
  fetch(
    `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${city}&language=en-us`
  )
    .then(res => res.json())
    .then(data => dispatch({ type: "GET_WEATHER_FETCH", payload: data[0] }))
    .catch(err =>
      dispatch({
        type: "GET_WEATHER_FETCH_ERROR",
        payload: err.message
      })
    );

  fetch(
    `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey}?apikey=${API_KEY}&language=en-us&details=true&metric=true`
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
        `https://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${API_KEY}&language=en-us&details=false`
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
