import React from 'react';
import axios from 'axios';

import {MovieCard} from '../movie-card/movie-card';
import {MovieView} from '../movie-view/movie-view';

export class MainView extends React.Component {
    constructor() {
        super(); // refers to OOP, means call the constructor of the parent class, in this case 'React.Component'
        this.state = {
            movies: [],
            selectedMovie: null
        }
    }

    componentDidMount() {
        axios.get('https://filmopedia.herokuapp.com/movies')
            .then(response => {
                this.setState({
                    movies:response.data
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }

    render() {
        const {movies, selectedMovie } = this.state;

        if (movies.length === 0) return <div class="main-view">'The list is empty'</div>;

        return (
            // <React.Fragment> or <>
            <div className="main-view">
                {selectedMovie
                ? <MovieView movieData={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
                : movies.map(movie => (
                    <MovieCard key={movie._id} movieData={movie} onMovieClick={(movie) => { this.setSelectedMovie(newSelectedMovie) }}/>
        ))
      }
    </div>
            // </React.Fragment> or </>
        );
    }
}
export default MainView;