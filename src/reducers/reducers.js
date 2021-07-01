import { combineReducers } from "redux";

import { SET_MOVIES, SET_FILTER } from "../actions/actions";

function visibilityFilter(state = "", action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}

function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      console.log("SET_MOVIES reducer reached");
      return action.value;
    default:
      return state;
  }
}

const movieApp = combineReducers({
  visbilityFilter,
  movies,
});

export default movieApp;
