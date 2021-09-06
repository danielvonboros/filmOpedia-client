import { combineReducers } from "redux";

import { SET_MOVIES, SET_FILTER, SET_USER } from "../actions/actions";

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
      return action.value;
    default:
      return state;
  }
}

const userState = JSON.parse(localStorage.getItem("user")) || {};

function user(
  state = {
    isAuth: localStorage.getItem("token") ? true : false,
    user: userState,
  },
  action
) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.value };
    default:
      return state;
  }
}

const moviesApp = combineReducers({
  visibilityFilter,
  movies,
  user,
});

export default moviesApp;
