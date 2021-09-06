import React from "react";

import { connect } from "react-redux";

import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axiosInstance from "../../config";

import { Link } from "react-router-dom";

import { setMovies, setUser } from "../../actions/actions";

import "./movie-view.scss";

class MovieView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {},
    };
  }
  keypressCallback(event) {
    console.log(event.key);
  }

  componentDidUpdate(prevProps, prevStates) {
    if (this.props.movies !== prevProps.movies) {
      this.getMovie();
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

  getMovie() {
    const movie = this.props.movies.find(
      (m) => m._id === this.props.match.params.movieId
    );
    return { movie };
  }

  handleAdd(movie) {
    axiosInstance
      .post(`/users/${this.props.user}/` + movie._id)
      .then((response) => {
        alert(this.props.movie.title + " has been added to your favorites!");
      })
      .catch((error) => console.error(error));
  }

  componentWillUnmount() {
    document.removeEventListener("keypress", this.keypressCallback);
  }
  render() {
    const { movie } = this.getMovie();
    const { onBackClick } = this.props;

    return (
      <Row className="justify-content-center">
        {movie && (
          <Col sm={12} md={10} lg={8} xl={6}>
            <div>
              <div className="movie-poster">
                <img className="img-center-align" src={movie.imageUrl} />
              </div>
              <ul className="movie-view list-group">
                <li className="movie-title list-group-item">
                  <span className="value">{movie.title}</span>
                  <span className="value"> ({movie.year})</span>
                </li>
                <li className="movie-genre list-group-item">
                  <span className="label">Genre: </span>
                  <span className="value">{movie.genre.name}</span>
                </li>
                <li className="movie-description list-group-item">
                  <span className="label">Description: </span>
                  <span className="value">{movie.description}</span>
                </li>
                <li className="movie-director list-group-item">
                  <span className="label">Directed by: </span>
                  <span className="value">{movie.director.name}</span>
                </li>
                <li className="list-group-item">
                  <Link to={`/director/${movie.director.name}`}>
                    <Button className="button-float-left" variant="danger">
                      {movie.director.name}
                    </Button>
                  </Link>
                  <Link to={`/genres/${movie.genre.name}`}>
                    <Button className="button-float-left" variant="danger">
                      {movie.genre.name}
                    </Button>
                  </Link>
                  <Button
                    className="button-float-right"
                    variant="outline-danger"
                    onClick={onBackClick}
                  >
                    Back
                  </Button>
                </li>
                <li className="list-group-item">
                  <Button
                    className="button-float-right"
                    type="button"
                    variant="danger"
                    onClick={() => this.handleAdd(movie)}
                  >
                    Add to favorites
                  </Button>
                </li>
              </ul>
            </div>
          </Col>
        )}
      </Row>
    );
  }
}

let mapStateToProps = (state) => {
  return { movies: state.movies, user: state.user };
};

export default connect(mapStateToProps, { setMovies, setUser })(MovieView);
