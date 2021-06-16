import React from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './profile-view.scss';

export class ProfileView extends React.Component {

    render () {
        const { profiles, onBackClick } = this.props;

        return (
            <Row className="justify-content-center">
                <Col sm={12} md={10} lg={8} xl={6}>
                    <div>
                        <ul className="profile-view list-group">
                        <li className="profile-username list-group-item">
                            <span className="value profile-title">{ profiles.username }</span>
                        </li>
                        <li className="profile-email list-group-item">
                            <span className="label">eMail: </span>
                            <span className="value">{ profiles.email }</span>
                        </li>
                        <li className="profile-birthday list-group-item">
                            <span className="label">Birthday: </span>
                            <span className="value">{ profiles.birthday }</span>
                        </li>
                        <li className="profile-favoritemovies list-group-item">
                            <span className="label">Favorite Movies: </span>
                            <span className="value">{ profiles.favoritemovies }</span>
                        </li>
                        <li className="list-group-item">
                            <Button className="button-float-right" variant="outline-danger" onClick={() => onBackClick()}>Back</Button>
                        </li>
                        </ul>
                    </div>
                </Col>
            </Row>
    //         <Row>
    //             <Col sm={12} md={6} lg={6} xl={4}>
    //             <Form.Group>
    //                 <Form.Label controlId="username">Username: </Form.Label>
    //                 <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} />
    //             </Form.Group>
    //             <Form.Group>
    //                 <Form.Label controlId="password">Password: </Form.Label>
    //                 <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
    //             </Form.Group>
    //             <Form.Group>
    //                 <Form.Label controlId="email">eMail: </Form.Label>
    //                 <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} />
    //             </Form.Group>
    //             <Form.Group>
    //                 <Form.Label controlId="birthday">Date of Birth: </Form.Label>
    //                 <Form.Control type="date" value={birthday} onChange={e => setBirthday(e.target.value)} />
    //             </Form.Group>
        
    //     <Button variant="danger" type="submit" onClick={handleRegister}>Submit</Button>
    //     {' '}
    //     <Button variant="outline-secondary" className="button-float-right" onClick={() => { onBackClick(null); }}>Back</Button>
    // </Col>
            // </Row>
            
        );
    }
}