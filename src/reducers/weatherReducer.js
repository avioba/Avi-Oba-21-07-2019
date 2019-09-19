// the initial state of weather in store
const initialState = {
  isDataLoaded: false,
  fiveDays: {},
  currentWeatherTlv: [],
  city: [],
  cityKey: "",
  cityName: "",
  latitude: "",
  longitude: "",
  celsius: "",
  fahrenheit: "",
  isCelsius: true,
  err: null,
  showError: false
};

// updates the state with data that came from WeatherActions
const weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_GEOLOCATION":
      return {
        ...state,
        latitude: action.payload.latitude,
        longitude: action.payload.longitude
      };
    case "GEO_POSITION_SEARCH_ERROR":
      return {
        ...state,
        err: action.payload + " geo position search",
        showError: true
      };
    case "GEO_POSITION_SEARCH":
      return {
        ...state,
        cityKey: action.payload.Key,
        cityName: action.payload.LocalizedName,
        err: null
      };
    case "FETCH_FIVE_DAYS_ERROR":
      return {
        ...state,
        err: action.payload + " 5-day daily forecast",
        isDataLoaded: false,
        showError: true
      };
    case "FETCH_FIVE_DAYS":
      return {
        ...state,
        fiveDays: action.payload,
        err: null,
        isDataLoaded: true
      };
    case "FETCH_CURRENT_WEATHER_ERROR":
      return {
        ...state,
        err: action.payload + " get current weather",
        isDataLoaded: false,
        showError: true
      };
    case "FETCH_CURRENT_WEATHER":
      return {
        ...state,
        celsius: action.payload,
        err: null,
        isDataLoaded: true
      };
    case "GET_WEATHER_FETCH_ERROR":
      return {
        ...state,
        err: action.payload + " city weather",
        isDataLoaded: false,
        showError: true
      };
    case "GET_WEATHER_FETCH":
      return {
        ...state,
        city: action.payload,
        cityKey: action.payload.Key,
        cityName: action.payload.LocalizedName,
        err: null,
        isDataLoaded: true
      };
    case "CHANGE_DEGREE_ERROR":
      return {
        ...state,
        err: action.payload,
        showError: true
      };
    case "CHANGE_DEGREE":
      return {
        ...state,
        celsius: action.payload,
        fahrenheit: action.payload * 1.8 + 32,
        isCelsius: !state.isCelsius
      };
    case "HIDE_ERROR":
      return {
        ...state,
        err: null,
        showError: action.payload
      };
    default:
      return state;
  }
};

export default weatherReducer;
