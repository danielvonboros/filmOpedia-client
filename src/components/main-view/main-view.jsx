import React from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import {MovieCard} from '../movie-card/movie-card';
import {MovieView} from '../movie-view/movie-view';
import {LoginView} from '../login-view/login-view';
import {RegistrationView} from '../registration-view/registration-view';

import './main-view.scss';

export class MainView extends React.Component {
    constructor() {
        super(); // refers to OOP, means call the constructor of the parent class, in this case 'React.Component'
        this.state = {
            movies: [],
            selectedMovie: null,
            user: null
        };
        
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

    onLoggedIn(user) {
        this.setState({
            user
        });
    }

    onRegister(register) {
        this.setState({
            register
        });
    }

    toggleRegister = (e) => {
        e.preventDefault();
        this.setState({
          register: !this.state.register
        })
    }

    render() {
        const { user, movies, selectedMovie, register } = this.state; // I had to include {user} here, it wasn't in the task, but otherwise it wouldn't work, showing me the error, that user isn't defined.

        if (register) return <RegistrationView onRegister={register => this.onRegister(register)} toggleRegister={this.toggleRegister} />;

        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} toggleRegister={this.toggleRegister} />;

        if (movies.length === 0) return <div className="main-view">'The list is empty'</div>;

        return (
            // <React.Fragment> or <>
            <div className="main-view">
                {selectedMovie
                ? (
                    <Row className="justify-content-md-center">
                        <Col md={8}>
                            <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
                        </Col>
                    </Row>
                    )
                : ( <Row className="justify-content-md-center"> {movies.map(movie => (
                    <Col sm={12} md={6} lg={4} xl={3}>
                        <MovieCard className="max-char-length" key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie) }}/>
                    </Col> ))}
                </Row>
                )
                }
            </div>
            // </React.Fragment> or </>
        );
    }
}
export default MainView;