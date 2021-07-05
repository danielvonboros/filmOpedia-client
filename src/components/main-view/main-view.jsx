import React from "react";
import axiosInstance from "../../config/";

import { connect } from "react-redux";

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link,
} from "react-router-dom";

import { setMovies, setUser } from "../../actions/actions";

import MoviesList from "../movies-list/movies-list";

import NavBar from "../navbar/navbar.jsx";
import MovieView from "../movie-view/movie-view";
import LoginView from "../login-view/login-view";
import GenreView from "../genre-view/genre-view";
import DirectorView from "../director-view/director-view";
import ProfileView from "../profile-view/profile-view";
import RegistrationView from "../registration-view/registration-view";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";

import "./main-view.scss";

class MainView extends React.Component {
  constructor(props) {
    super(props); // refers to OOP, means call the constructor of the parent class, in this case 'React.Component'
    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem(user));
    if (this.props.user.isAuth) {
      this.getMovies();
      this.getUsers();
      // this.props.setUser(user);
    }
  }

  getMovies() {
    axiosInstance
      .get("/movies")
      .then((response) => {
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getUsers() {
    this.setState({ userLoading: true });
    axiosInstance
      .get("/users")
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
    this.setState({
      // user: authData.user.username,
      token: authData.token,
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", JSON.stringify(authData.user));
    this.getMovies();
    this.props.setUser(authData.user);
    // this.getUsers(authData.token);
    window.location.reload();
  }

  handleLogout() {
    localStorage.clear();
    window.open("/", "_self");
  }

  render() {
    let { movies } = this.props;
    let { isAuth, user } = this.props.user;
    // let { user, token } = this.state;

    return (
      <>
        <Router>
          <NavBar onLogout={this.handleLogout} />
          <Container>
            <Row
              className="main-view justify-content-md-center"
              key="main-view"
            >
              <Route
                exact
                path="/"
                render={() => {
                  if (!isAuth)
                    return (
                      <Col>
                        <LoginView
                          onLoggedIn={(user) => this.onLoggedIn(user)}
                        />
                      </Col>
                    );
                  // if (movies.length === 0) return <div className="main-view" />;
                  return <MoviesList movies={movies} />;
                }}
              />

              <Route
                path="/register"
                render={() => {
                  if (isAuth) return <Redirect to="/" />;
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
                  if (!isAuth)
                    return (
                      <Col>
                        <LoginView
                          onLoggedIn={(user) => this.onLoggedIn(user)}
                        />
                      </Col>
                    );
                  return (
                    <Col md={10}>
                      <MovieView
                        user={user}
                        match={match}
                        // movie={movies.find(
                        //   (m) => m._id === match.params.movieId
                        // )}
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
                  if (!isAuth)
                    return (
                      <Col>
                        <LoginView
                          onLoggedIn={(user) => this.onLoggedIn(user)}
                        />
                      </Col>
                    );
                  return this.state.loading ? (
                    <Spinner animation="border" />
                  ) : (
                    <Col md={10}>
                      <DirectorView
                        director={
                          movies.find(
                            (m) => m.director.name === match.params.name
                          ).director
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
                  if (!isAuth)
                    return (
                      <Col>
                        <LoginView
                          onLoggedIn={(user) => this.onLoggedIn(user)}
                        />
                      </Col>
                    );
                  return this.state.loading ? (
                    <Spinner animation="border" />
                  ) : (
                    <Col md={10}>
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
                  if (!isAuth)
                    return (
                      <Col>
                        <LoginView
                          onLoggedIn={(user) => this.onLoggedIn(user)}
                        />
                      </Col>
                    );
                  return this.state.userLoading ? (
                    <Spinner animation="border" />
                  ) : (
                    <Col md={10} lg={10}>
                      <ProfileView
                        onBackClick={() => history.goBack()}
                        // token={token}
                        // onUpdate={(data) => this.updateUser(data)}
                        movies={movies}
                        onMovieDelete={(data) => this.onMovieAddOrDelete(data)}
                      />
                    </Col>
                  );
                }}
              />
            </Row>
          </Container>
        </Router>
      </>
    );
  }
}

let mapStateToProps = (state) => {
  return { movies: state.movies, user: state.user };
};

export default connect(mapStateToProps, { setMovies, setUser })(MainView);
