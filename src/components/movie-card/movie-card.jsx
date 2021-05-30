import React from 'react';

export class MovieCard extends React.Component {
    render() {
        const { movieData } = this.props;
        return <div class="movie-card">{ movie.title }</div>
    }
}