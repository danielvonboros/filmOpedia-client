import React from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";

import { Link } from "react-router-dom";

import "./movie-view.scss";

export class MovieView extends React.Component {
  keypressCallback(event) {
    console.log(event.key);
  }

  componentDidMount() {
    document.addEventListener("keypress", this.keypressCallback);
  }

  handleAdd() {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    axios
      .post(
        `https://filmopedia.herokuapp.com/users/${user}/` +
          this.props.movie._id,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        console.log(response);
        alert(this.props.movie.title + " has been added to your favorites!");
      });
  }

  handleRemove() {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    axios
      .post(
        `https://filmopedia.herokuapp.com/users/${user}/` +
          this.props.movie._id,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        console.log(response);
        alert(
          this.props.movie.title + " has been removed from your favorites!"
        );
      });
  }

  componentWillUnmount() {
    document.removeEventListener("keypress", this.keypressCallback);
  }
  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Row className="justify-content-center">
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
                <Link to={`/movies/${movie.title}`}>
                  <Button
                    className="button-float-right"
                    type="button"
                    variant="danger"
                    onClick={() => this.handleAdd(movie)}
                  >
                    Add to favorites
                  </Button>
                </Link>

                <Link to={`/movies/${movie.title}`}>
                  <Button
                    className="button-float-right"
                    type="button"
                    variant="outline-danger"
                    onClick={() => this.handleRemove(movie)}
                  >
                    Remove from favorites
                  </Button>
                </Link>
              </li>
            </ul>
          </div>
        </Col>
      </Row>
    );
  }
}
