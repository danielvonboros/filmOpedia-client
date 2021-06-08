import React from 'react';
import {MovieCard} from '../movie-card/movie-card';

export class MainView extends React.Component {
    constructor() {
        super(); // refers to OOP, means call the constructor of the parent class, in this case 'React.Component'
        this.state = {
            movies: [
               {_id:1, title: 'Inception', description: 'desc1', imagePath:''},
               {_id:2, title: 'The Shawshank Redemption', description: 'desc2', imagePath:''},
               {_id:3, title: 'Gladiator', description: 'desc3', imagePath:''} 
            ],
            selectedMovie: null
        }
    }
    render() {
        const {movies, selectedMovie } = this.state;
        if (selectedMovie) return <MovieView movie={selectedMovie} />;

        if (movies.length === 0) return <div class="main-view">'The list is empty'</div>;

        return (
            // <React.Fragment> or <>
            <div className="main-view">
                {movies.map((movie) => <MovieCard key={movie._id} movieData={movie} /> )}
            </div>
            // </React.Fragment> or </>
        );
    }
}
export default MainView;