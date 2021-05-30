import React from 'react';

export class MovieView extends React.Component {
    render () {
        const { movieData } = this.props;
        return (
            <div className="movie-view">
                <div className="movie-poster">
                    <img src="{movie.imagePath}" />
                </div>
                <div className="movie-title">
                    <span className="label">Title: </span>
                    <span className="value">{ movie.title }</span>
                </div>
                <div className="movie-description">
                    <span className="label">Description: </span>
                    <span className="value">{ movie.description }</span>
                </div>
            </div>
        )
    }
}