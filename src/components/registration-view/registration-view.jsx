import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './registration-view.scss';

export function RegistrationView(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ birthday, setBirthday ] = useState('')


const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password. email, birthday);
    props.onRegister(username);
};

return (
    <Row className="reg-margin-top justify-content-md-center">
            <Col sm={12} md={6} lg={6} xl={4}>
                <Form.Group>
                    <Form.Label controlId="username">Username: </Form.Label>
                    <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} />
                </Form.Group>
                <Form.Group>
                    <Form.Label controlId="password">Password: </Form.Label>
                    <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </Form.Group>
                <Form.Group>
                    <Form.Label controlId="email">eMail: </Form.Label>
                    <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} />
                </Form.Group>
                <Form.Group>
                    <Form.Label controlId="birthday">Date of Birth: </Form.Label>
                    <Form.Control type="date" value={birthday} onChange={e => setBirthday(e.target.value)} />
                </Form.Group>
        
        <Button variant="danger" type="submit" onClick={handleSubmit}>Submit</Button>
        {' '}
        <Button variant="outline-secondary" className="button-float-right" onClick={() => { onBackClick(null); }}>Back</Button>
    </Col>
    </Row>
)
}