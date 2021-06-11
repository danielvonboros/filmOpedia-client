import React from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './movie-view.scss';

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
                        <li class="list-group-item">
                            <Button className="button-float-right" variant="outline-danger" onClick={() => { onBackClick(null); }}>Back</Button>
                        </li>
                        </ul>
                    </div>
                </Col>
            </Row>
            
        );
    }
}