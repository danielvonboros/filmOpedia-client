import React from "react";

import {Col, Row, Button} from 'react-bootstrap';

export function GenreView(props) {
  const genre = props.genre;
  console.log(props)
  return(
    <Row className="justify-content-center">
                <Col sm={12} md={10} lg={8} xl={6}>
                    <div>
                        <ul className="movie-view list-group">
                        <li className="movie-title list-group-item">
                            <span className="value">{ genre.name }</span>
                        </li>
                        <li className="movie-genre list-group-item">
                            <span className="value">{ genre.description }</span>
                        </li>
                        <li className="movie-director list-group-item">
                            {props.movies.map((m) => m.genre.name === genre.name ? m.title : null)}
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
