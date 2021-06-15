import React from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './genre-view.scss';

export class GenreView extends React.Component {

    render () {
        const { genre, onBackClick } = this.props;

        return (
            <Row className="justify-content-center">
                <Col sm={12} md={10} lg={8} xl={6}>
                    <div>
                        <ul className="genre-view list-group">
                        <li className="genre-name list-group-item">
                            <span className="value genre-title">{ genre.name }</span>
                        </li>
                        <li className="genre-description list-group-item">
                            <span className="label">Description: </span>
                            <span className="value">{ genre.description }</span>
                        </li>
                        <li className="list-group-item">
                            <Button className="button-float-right" variant="outline-danger" onClick={() => onBackClick()}>Back</Button>
                        </li>
                        </ul>
                    </div>
                </Col>
            </Row>
        );
    }
}