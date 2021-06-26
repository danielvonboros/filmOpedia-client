import React from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { GenreView } from "../genre-view/genre-view";
import { DirectorView } from "../director-view/director-view";
import { ProfileView } from "../profile-view/profile-view";
import { RegistrationView } from "../registration-view/registration-view";

import "./main-view.scss";

export class MainView extends React.Component {
  constructor() {
    super(); // refers to OOP, means call the constructor of the parent class, in this case 'React.Component'
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      loading: false,
      userLoading: false,
      token: null,
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user"),
        token: accessToken,
      });
      this.getMovies(accessToken);
      this.getUsers(accessToken);
    }
  }

  getMovies(token) {
    this.setState({ loading: true });
    axios
      .get("http://filmopedia.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // Assign the result to the state
        this.setState({
          movies: response.data,
          loading: false,
        });
      })
      .catch(function (error) {
        console.log(error);
        this.setState({ loading: false });
      });
  }

  getUsers(token) {
    this.setState({ userLoading: true });
    axios
      .get("http://filmopedia.herokuapp.com/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // Assign the result to the state
        this.setState({
          users: response.data,
          userLoading: false,
        });
      })
      .catch(function (error) {
        console.log(error);
        this.setState({ userLoading: false });
      });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.username,
      token: authData.token,
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.username);
    this.getMovies(authData.token);
    this.getUsers(authData.token);
  }

  render() {
    const { movies, user, users, token } = this.state;

    return (
      <Router>
        <Row className="main-view justify-content-md-center" key="main-view">
          <Route
            exact
            path="/"
            render={() => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              return movies.map((m) => (
                <Col sm={12} md={6} lg={4} xl={3} key={m._id}>
                  <MovieCard movie={m} />
                </Col>
              ));
            }}
          />
          <Route
            path="/register"
            render={() => {
              if (user) return <Redirect to="/" />;
              return (
                <Col>
                  <RegistrationView />
                </Col>
              );
            }}
          />
          <Route
            path="/movies/:movieId"
            render={({ match, history }) => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              return this.state.loading ? (
                <Spinner animation="border" />
              ) : (
                <Col md={8}>
                  <MovieView
                    movie={movies.find((m) => m._id === match.params.movieId)}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />
          <Route
            path="/director/:name"
            render={({ match, history }) => {
              if (movies.length === 0) return <div className="main-view" />;
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              return this.state.loading ? (
                <Spinner animation="border" />
              ) : (
                <Col md={8}>
                  <DirectorView
                    director={
                      movies.find((m) => m.director.name === match.params.name)
                        .director
                    }
                    onBackClick={() => history.goBack()}
                    movies={movies}
                  />
                </Col>
              );
            }}
          />
          <Route
            path="/genres/:name"
            render={({ match, history }) => {
              if (movies.length === 0) return <div className="main-view" />;
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              return this.state.loading ? (
                <Spinner animation="border" />
              ) : (
                <Col md={8}>
                  <GenreView
                    genre={
                      movies.find((m) => m.genre.name === match.params.name)
                        .genre
                    }
                    onBackClick={() => history.goBack()}
                    movies={movies}
                  />
                </Col>
              );
            }}
          />
          <Route
            path="/users/:username"
            render={({ match, history }) => {
              if (movies.length === 0) return <div className="main-view" />;
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              return this.state.userLoading ? (
                <Spinner animation="border" />
              ) : (
                <Col md={8}>
                  <ProfileView
                    profiles={users.find(
                      (p) => p.username === match.params.username
                    )}
                    onBackClick={() => history.goBack()}
                    token={token}
                    onUpdate={(data) => this.updateUser(data)}
                    movies={movies}
                    onMovieDelete={(data) => this.onMovieAddOrDelete(data)}
                  />
                </Col>
              );
            }}
          />
        </Row>
      </Router>
    );
  }
}
export default MainView;
