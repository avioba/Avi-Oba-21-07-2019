import weatherReducer from "./weatherReducer";
import favoriteReducer from "./favoriteReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  weather: weatherReducer,
  favorite: favoriteReducer
});

export default rootReducer;
