import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';

import './login-view.scss';

export function LoginView(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        /* Send a request to the server for authentication */
        axios.post('http://filmopedia.herokuapp.com/login', {
            username: username,
            password: password
        })
        .then(response => {
            const data = response.data;
            /* then call props.onLoggedIn(username), which provides the username to our parent component (child to parent communication) */
            props.onLoggedIn(data);
        })
        .catch(e => {
            console.log('no such user')
        });
    };

    return (
        <Row className="login-margin-top justify-content-md-center">
            <Col sm={12} md={6} lg={6} xl={4}>
        <Form>
            <Form.Group controlId="formUsername">
                <Form.Label>Username: </Form.Label>
                <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formPassword">
                <Form.Label>Password: </Form.Label>
                <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <Button variant="danger" type="submit" onClick={handleSubmit}>Submit</Button>
            {' '}
            <Button variant="outline-secondary" className="button-float-right" type="button" onClick={props.toggleRegister}>Register</Button>
        </Form>
        </Col>
        </Row>
    );
}