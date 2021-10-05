import React from "react";

import {Row, Col, Button} from 'react-bootstrap';

export function DirectorView(props) {
  const director = props.director;
    return(
    <Row className="justify-content-center">
                <Col sm={12} md={10} lg={8} xl={6}>
                    <div>
                        <ul className="movie-view list-group">
                        <li className="movie-title list-group-item">
                            <span className="value">{ director.name }</span>
                        </li>
                        <li className="movie-genre list-group-item">
                            <span className="value">{ director.bio }</span>
                        </li>
                        <li className="movie-description list-group-item">
                            <span className="label">BirthYear: </span>
                            <span className="value">{ director.birthYear }</span>
                        </li>
                        <li className="movie-director list-group-item">
                            <span className="label">DeathYear: </span>
                            <span className="value">{ director.deathYear }</span>
                        </li>
                        <li className="list-group-item">
                            {props.movies.map((m) => m.director.name === director.name ? m.title : null )}
                        </li>
                        <li className="list-group-item">
                            <Button className="button-float-right" variant="outline-danger" onClick={() => { onBackClick(null); }}>Back</Button>
                        </li>
                        </ul>
                    </div>
                </Col>
            </Row>
  );
}
