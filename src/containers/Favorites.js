// React
import React from "react";
import { Link } from "react-router-dom";
// Redux
import { connect } from "react-redux";
import { goToFavorite, deleteFavorite } from "../actions/favoriteActions";

const Favorites = props => {
  let { favorites } = props;

  // gets selected favorite, takes cityKey and city from the favorite
  // and passes it to goToFavorite function
  const selectedFavorite = favorite => {
    const cityKey = favorite.id;
    const city = favorite.city;
    props.goToFavorite(cityKey, city);
  };

  // gets favorite, takes cityKey from the favorite
  // and passes it to deleteFavorite function
  const removeFavorite = favorite => {
    const cityKey = favorite.id;
    props.deleteFavorite(cityKey);
  };

  return (
    <div className="favorites">
      {props.err && alert(props.err)}

      {favorites.length > 0 ? (
        <div className="row">
          {favorites &&
            favorites.map((favorite, i) => {
              return (
                <div key={i} className="col s6 m4 l3 xl2 push-xl1">
                  <button
                    onClick={removeFavorite.bind(null, favorite)}
                    className="right"
                  >
                    <i className="material-icons red-text">clear</i>
                  </button>
                  <Link onClick={selectedFavorite.bind(null, favorite)} to="/">
                    <div className="card-panel center-align grey">
                      <h3 className="truncate">{favorite.city}</h3>
                      <br />
                      <h4>
                        {favorite.temperature}
                        <span>&deg;c</span>
                      </h4>
                    </div>
                  </Link>
                </div>
              );
            })}
        </div>
      ) : (
        <h4 className="container center-align">you dont have favorites</h4>
      )}
    </div>
  );
};

// turns state from the store to props
// so it can be useable in this component
const mapStateToProps = state => ({
  favorites: state.favorite.favorites,
  err: state.favorite.err
});

// connect React to Redux
export default connect(
  mapStateToProps,
  { goToFavorite, deleteFavorite }
)(Favorites);
