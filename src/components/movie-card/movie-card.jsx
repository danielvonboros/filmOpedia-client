import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import './movie-card.scss';

export class MovieCard extends React.Component {

    render() {
        const { movie, onMovieClick } = this.props;
        
        return (
            <Card>
                <Card.Img variant="top" src={movie.imageUrl} />
                <Card.Body>
                    <Card.Title class="movie-title">{movie.title}</Card.Title>
                    <Card.Text>{movie.description}</Card.Text>
                    <Button variant="outline-danger" onClick={() => onMovieClick(movie)}>Open</Button>
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
        imageUrl:PropTypes.string.isRequired,
        director: PropTypes.shape({
            name: PropTypes.string.isRequired,
            bio: PropTypes.string,
            birthYear: PropTypes.number,
            deathYear: PropTypes.number
        }),
        genre: PropTypes.shape({
            name: PropTypes.string.isRequired,
            description: PropTypes.string
        })
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};