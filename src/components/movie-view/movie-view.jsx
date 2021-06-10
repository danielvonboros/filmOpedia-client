import React from 'react';

export class MovieView extends React.Component {

    keypressCallback(event) {
        console.log(event.key);
    }

    componentDidMount() {
        document.addEventListener('keypress', this.keypressCallback);
    }
    componentWillUnmount() {
        document.removeEventListener('keypress', this.keypressCallback);
    }
    render () {
        const { movie, onBackClick } = this.props;

        return (
            <div className="movie-view">
                <div className="movie-poster">
                    <img src={movie.imageUrl} />
                </div>
                <div className="movie-title">
                    <span className="label">Title: </span>
                    <span className="value">{ movie.title }</span>
                </div>
                <div className="movie-year">
                    <span className="label">Year: </span>
                    <span className="value">{ movie.year }</span>
                </div>
                <div className="movie-genre">
                    <span className="label">Genre: </span>
                    <span className="value">{ movie.genre.name }</span>
                </div>
                <div className="movie-description">
                    <span className="label">Description: </span>
                    <span className="value">{ movie.description }</span>
                </div>
                <div className="movie-director">
                    <span className="label">Directed by: </span>
                    <span className="value">{ movie.director.name }</span>
                </div>
                <button onClick={() => { onBackClick(null); }}>Back</button>
            </div>
        );
    }
}