import React from 'react';

export class MovieView extends React.Component {
    render () {
        const { movieData, onBackClick } = this.props;

        return (
            <div className="movie-view">
                <div className="movie-poster">
                    <img src={movieData.imagePath} />
                </div>
                <div className="movie-title">
                    <span className="label">Title: </span>
                    <span className="value">{ movieData.title }</span>
                </div>
                <div className="movie-description">
                    <span className="label">Description: </span>
                    <span className="value">{ movieData.description }</span>
                </div>
                <button onClick={() => { onBackClick(null); }}>Back</button>
            </div>
        );
    }
}