// the initial state of favorite in store
const initialState = {
  favorites: [],
  err: null
};

// updates the state with data that came from favoriteActions
const favoriteReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_FAVORITE_ERROR":
      return {
        ...state,
        err: action.payload
      };
    case "ADD_FAVORITE":
      return {
        ...state,
        favorites: state.favorites.concat(action.payload)
      };
    case "DELETE_FAVORITE_ERROR":
      return {
        ...state,
        err: action.payload
      };
    case "DELETE_FAVORITE":
      return {
        ...state,
        favorites: state.favorites.filter(
          favorite => action.payload !== favorite.id
        )
      };
    default:
      return state;
  }
};

export default favoriteReducer;
