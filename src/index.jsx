import React from "react";
import ReactDOM from "react-dom";
import Container from "react-bootstrap/Container";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { devToolsEnhancer } from "redux-devtools-extension";
import moviesApp from "./reducers/reducers";
import "bootstrap/dist/css/bootstrap.min.css";

// Import statement for MainView
import MainView from "./components/main-view/main-view";

// Import statement to bundle `./index.scss`
import "./index.scss";

const store = createStore(moviesApp, devToolsEnhancer());

// Main component
class FilmOpediaApplication extends React.Component {
  render() {
    return (
      <Container>
        <MainView />
      </Container>
    );
  }
}

// Tells React to render your app in the root DOM
ReactDOM.render(
  <Provider store={store}>
    <FilmOpediaApplication />
  </Provider>,
  document.getElementById("app-container")
);
