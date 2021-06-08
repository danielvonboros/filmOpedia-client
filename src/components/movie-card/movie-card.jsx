import React from 'react';

export class MovieCard extends React.Component {

    render() {
        const { movieData, onMovieClick } = this.props;
        return <div class="movie-card" onClick={() => { onMovieClick(movieData); }}>{ movieData.title }</div>
    }
}