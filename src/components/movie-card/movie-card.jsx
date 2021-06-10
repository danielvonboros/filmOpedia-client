import React from 'react';
import PropTypes from 'prop-types';

export class MovieCard extends React.Component {

    render() {
        const { movie, onMovieClick } = this.props;
        return <div class="movie-card" onClick={() => { onMovieClick(movie); }}>{ movie.title }</div>
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