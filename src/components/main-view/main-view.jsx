import React from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';

import {MovieCard} from '../movie-card/movie-card';
import {MovieView} from '../movie-view/movie-view';
import {LoginView} from '../login-view/login-view';
import {GenreView} from '../genre-view/genre-view';
import {DirectorView} from '../director-view/director-view';
import {ProfileView} from '../profile-view/profile-view';
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
            this.getMovies(accessToken);
            this.getUsers(accessToken)
        }
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

    getUsers(token) {
        axios.get('http://filmopedia.herokuapp.com/users', {
            headers: { Authorization: `Bearer ${token}`}
        })
        .then(response => {
            // Assign the result to the state
            this.setState({
                users: response.data
            });
        })
        .catch(function (error) {
            console.log(error);
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
        this.getUsers(authData.token);
    }

    render() {
        const { movies, user, users } = this.state; 

        return (
            <Router>
                <Row className="main-view justify-content-md-center" key="main-view">
                    <Route exact path="/" render={() => {
                        if (!user) return <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>
                    return movies.map(m => (
                        <Col sm={12} md={6} lg={4} xl={3} key={m._id}>
                            <MovieCard movie={m} />
                        </Col>
                        ))
                    }} />
                    <Route path="/register" render={() => {
                        if (user) return <Redirect to="/" />
                        return <Col>
                            <RegistrationView />
                        </Col>
                    }} />
                    <Route path="/movies/:movieId" render={({match, history}) => {
                        if (!user) return <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>
                        return <Col md={8}>
                            <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />
                    <Route path="/director/:name" render={({match, history}) => {
                        if (movies.length === 0) return <div className="main-view" />
                        if (!user) return <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>
                        return <Col md={8}>
                            <DirectorView director={movies.find(m => m.director.name === match.params.name).director} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />
                    <Route path="/genres/:name" render={({match, history}) => {
                        if (movies.length === 0) return <div className="main-view" />
                        if (!user) return <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>
                        return <Col md={8}>
                            <GenreView genre={movies.find(m => m.genre.name === match.params.name).genre} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />
                    <Route path="/users/:username" render={({match, history}) => {
                        if (movies.length === 0) return <div className="main-view" />
                        if (!user) return <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>
                        return <Col md={8}>
                            <ProfileView profiles={users.find(p => p.username === match.params.username)} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />
                </Row>
            </Router>
        );
    }
}
export default MainView;