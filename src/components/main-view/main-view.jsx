import React from 'react';
import axios from 'axios';

import {MovieCard} from '../movie-card/movie-card';
import {MovieView} from '../movie-view/movie-view';

export class MainView extends React.Component {
    constructor() {
        super(); // refers to OOP, means call the constructor of the parent class, in this case 'React.Component'
        this.state = {
            movies: [
               {_id:1, title: 'Inception', description: 'Dom Cobb (Leonardo DiCaprio) is a thief with the rare ability to enter people\'s dreams and steal their secrets from their subconscious. His skill has made him a hot commodity in the world of corporate espionage but has also cost him everything he loves. Cobb gets a chance at redemption when he is offered a seemingly impossible task: Plant an idea in someone\'s mind. If he succeeds, it will be the perfect crime, but a dangerous enemy anticipates Cobb\'s every move.', imagePath:'https://resizing.flixster.com/4MrL62heb7yBgBt8zllSeqNZxg4=/206x305/v2/https://flxt.tmsimg.com/assets/p7825626_p_v10_af.jpg'},
               {_id:2, title: 'The Shawshank Redemption', description: 'Andy Dufresne (Tim Robbins) is sentenced to two consecutive life terms in prison for the murders of his wife and her lover and is sentenced to a tough prison. However, only Andy knows he didn\'t commit the crimes. While there, he forms a friendship with Red (Morgan Freeman), experiences brutality of prison life, adapts, helps the warden, etc., all in 19 years.', imagePath:'https://resizing.flixster.com/U8DOCAyL0efMS6cA0UmrNi8oyQk=/206x305/v2/https://flxt.tmsimg.com/NowShowing/3725/3725_aa.jpg'},
               {_id:3, title: 'Gladiator', description: 'Commodus (Joaquin Phoenix) takes power and strips rank from Maximus (Russell Crowe), one of the favored generals of his predecessor and father, Emperor Marcus Aurelius, the great stoical philosopher. Maximus is then relegated to fighting to the death in the gladiator arenas.', imagePath:'https://resizing.flixster.com/z1uxBIn8PvwL-9RdEvzLbHJbc9Y=/206x305/v2/https://flxt.tmsimg.com/assets/p24674_p_v13_bc.jpg'} 
            ],
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