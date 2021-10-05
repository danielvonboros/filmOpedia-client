import React from "react";
import ReactDOM from "react-dom";
import Container from "react-bootstrap/Container";
import Router from "./components/router/router"
import NavBar from "./components/navbar/navbar";

// Import statement for MainView
import AuthDataHandler from "./components/auth-data-handler/auth-data-handler";
import MovieDataHandler from "./components/movie-data-handler/movie-data-handler";


// Import statement to bundle `./index.scss`
import "./index.scss";
import { Navbar } from "react-bootstrap";

// Main component
class filmOpediaApplication extends React.Component {
  render() {
    return (
        <AuthDataHandler >
          <MovieDataHandler>
              <Router />
          </MovieDataHandler>
        </AuthDataHandler>
    );
  }
}

// Find the root of the app
const container = document.getElementById("app-container");

// Tells React to render your app in the root DOM
ReactDOM.render(React.createElement(filmOpediaApplication), container);
