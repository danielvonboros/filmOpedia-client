import React from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './director-view.scss';

export function DirectorView(props) {
    const {director, onBackClick, movies } = props;
    const directorsMovies = movies.filter(m => m.director.name === director.name);

        return (
            <Row className="justify-content-center">
                <Col sm={12} md={10} lg={8} xl={6}>
                    <div>
                        <ul className="director-view list-group">
                        <li className="director-name list-group-item">
                            <span className="value director-title">{ director.name }</span>
                        </li>
                        <li className="director-bio list-group-item">
                            <span className="label">Bio: </span>
                            <span className="value">{ director.bio }</span>
                        </li>
                        <li className="director-bio list-group-item">
                            <span className="label">Birth Year: </span>
                            <span className="value">{ director.birthYear }</span>
                        </li>
                        <li className="director-bio list-group-item">
                            <span className="label">Death Year: </span>
                            <span className="value">{ director.deathYear }</span>
                        </li>
                        <li className="other-movies list-group-item">
                            <span className="label">Other movies by {`${director.name}`}:</span>
                            <span>{directorsMovies.map((m, i) => <div className="director-movie" key={i}>{m.title}</div>)}</span>
                        </li>
                        <li className="back-button list-group-item">
                            <Button className="button-float-right" variant="outline-danger" onClick={() => onBackClick()}>Back</Button>
                        </li>
                        </ul>
                    </div>
                </Col>
            </Row>
        );
}
    