import React from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import {BrowserRouter as Router, Route} from 'react-router-dom';

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
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getMovies(accessToken)
        }
    }

    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }

    onLoggedIn(authData) {
        console.log(authData);
        this.setState({
            user: authData.user.username
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.username);
        this.getMovies(authData.token);
    }

    getMovies(token) {
        axios.get('http://filmopedia.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}`}
        })
        .then(response => {
            // Assign the result to the state
            this.setState({
                movies: response.data
            });
        })
        .catch(function (error) {
            console.log(error);
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

    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
            user: null
        });
    }

    render() {
        const { user, movies, register } = this.state; // I had to include {user} here, it wasn't in the task, but otherwise it wouldn't work, showing me the error, that user isn't defined.

        if (register) return <RegistrationView onRegister={register => this.onRegister(register)} toggleRegister={this.toggleRegister} />;

        if (!user) return 
            <Row>
                <Col>
                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} toggleRegister={this.toggleRegister} />;
                </Col>
            </Row>
        
        if (movies.length === 0) return <div className="main-view" />;

        return (
            <Router>
                <Row className="main-view justify-content-md-center">
                    <Route exact path="/" render={() => {
                    return movies.map(m => 
                        (<Col sm={12} md={6} lg={4} xl={3} key={m._id}>
                            <MovieCard movie={m} />
                        </Col>))
                    }} />
                    <Route path="/movies/:movieId" render={({match}) => {
                        return <Col md={8}>
                            <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />
                    
                </Row>
            </Router>
        );
    }
}
export default MainView;