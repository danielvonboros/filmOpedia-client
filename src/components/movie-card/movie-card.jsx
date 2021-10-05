import React from "react";

import {Link} from "react-router-dom";

import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { ROUTE_MOVIE } from "../../utils/constants/routes";


import "./movie-card.scss";

export class MovieCard extends React.Component {
  constructor(props){
      super(props);
  }


  render() {
    const { movie } = this.props;

    return (
      <Card>
        <Card.Img variant='top' src={movie.imageUrl} />
        <Card.Body>
          <Card.Title className='movie-title'>{movie.title}</Card.Title>
          <Card.Text>{movie.description}</Card.Text>
          <Link to={`${ROUTE_MOVIE}/${movie._id}`}>
            <Button variant='outline-danger'>Open</Button>    
          </Link>
          <hr></hr>
          
          <div><span className="details-text">Director: </span>
          <Link to={`/directors/${movie.director.name}`}>
            <Button className="btn-float-right" variant='outline-dark'>{movie.director.name}</Button>
          </Link></div>
          
          <div><span>Genre: </span>
          <Link to={`/genres/${movie.genre.name}`}>
            <Button className="btn-float-right" variant='outline-dark'>{movie.genre.name}</Button>
            
          </Link>
          </div>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    year: PropTypes.number,
    rank: PropTypes.number,
    description: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    director: PropTypes.shape({
      name: PropTypes.string.isRequired,
      bio: PropTypes.string,
      birthYear: PropTypes.number,
      deathYear: PropTypes.number,
    }),
    genre: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
    }),
  }).isRequired,
  onMovieClick: PropTypes.func,
};
