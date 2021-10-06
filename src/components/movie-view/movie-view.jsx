import React from 'react';
import axios from 'axios';

import { withRouter } from 'react-router';

import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import LoadingView from '../loading-view/loading-view';

import {ENDPOINT_MOVIE } from '../../utils/constants/endpoints'; 
import {AuthData} from '../context/context';

import './movie-view.scss';

class MovieView extends React.Component {
    static contextType = AuthData;
    constructor(props) {
        super(props);
        this.state={
            loading: true,
            movie: null,
        }
        
        console.log(props);
    }

    getMovie(token) {
        axios
          .get(`${ENDPOINT_MOVIE}/id/${this.props.match.params.movieId}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            this.setState({
              movie: response.data,
              loading: false,
            });
          })
          .catch((error) => {
            console.log(this);
            console.log(error);
            this.setState({loading:false})
          });
      }

    componentDidMount() {
        const token = this.context.authData.token;
        console.log(token);
        this.getMovie(token);
        
    }
    
    render () {
        if (this.state.loading) {
            return <LoadingView />
        }

        if(this.state.movie === null){
            return <span>An error occurred</span>
        }

        const movie = this.state.movie;

        return (
            <Row className="justify-content-center">
                <Col sm={12} md={10} lg={8} xl={6}>
                    <div>
                        <div className="movie-poster">
                            <img className="img-center-align" src={movie.imageUrl} />
                        </div>
                        <ul className="movie-view list-group">
                        <li className="movie-title list-group-item">
                            <span className="value">{ movie.title }</span>
                            <span className="value"> ({ movie.year })</span>
                        </li>
                        <li className="movie-genre list-group-item">
                            <span className="label">Genre: </span>
                            <span className="value">{ movie.genre.name }</span>
                        </li>
                        <li className="movie-description list-group-item">
                            <span className="label">Description: </span>
                            <span className="value">{ movie.description }</span>
                        </li>
                        <li className="movie-director list-group-item">
                            <span className="label">Directed by: </span>
                            <span className="value">{ movie.director.name }</span>
                        </li>
                        <li className="list-group-item">
                            <Button className="button-float-right" variant="outline-danger" onClick={() => { this.props.history.goBack(); }}>Back</Button>
                        </li>
                        </ul>
                    </div>
                </Col>
            </Row>
            
        );
    }
}

export default withRouter(MovieView);