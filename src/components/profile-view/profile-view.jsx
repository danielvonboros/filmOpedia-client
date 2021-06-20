import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import profileUpdateView from '../profile-update-view/profile-update-view';

import './profile-view.scss';
import axios from 'axios';

export class ProfileView extends React.Component {

    // const [ username, setUsername ] = useState('');
    // const [ password, setPassword ] = useState('');
    // const [ email, setEmail ] = useState('');
    // const [ birthday, setBirthday ] = useState('')
    
    handleUpdate = (e) => {
        e.preventDefault();
        /* Send a request to the server for authentication */
        axios.put('http://filmopedia.herokuapp.com/users',{
            headers: { Authorization:  `Bearer ${token}` }},
            {
                username: username,
                password: password,
                email: email,
                birthday: birthday
            }
        )
        .then(response => {
            const data = response.data;
            console.log(data);
            window.open('/', '_self');
            // return <Redirect to="/" />
        })
        .catch(e => {
            console.log('something went wrong')
        });
    };

    deleteAccount(token) {
        console.log('Not deleted yet');
        axios.delete(`https://filmopedia.herokuapp.com/users/${user}`, 
        { headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}})
        .then(response => {
          console.log(response);
          console.log(`${user} has been deleted`);
        })
        .catch(e => {
          console.log('An error occured');
          console.log(e);
        })
      }

    addFavoriteMovie = (e) => {
        e.preventDefault();
        axios.post('http://filmopedia.herokuapp.com/users/:username', {
            headers: { Authorization: `Bearer ${token}`}
        })
        .then(response => {
            const data = response.data;
            console.log(data);
            window.open('/', '_self');
            // return <Redirect to="/" />
        })
        .catch(e => {
            console.log('something went wrong')
        });
    };

    removeFavoriteMovie = (e) => {
        e.preventDefault();
        axios.delete('http://filmopedia.herokuapp.com/users/:username', {
            headers: { Authorization: `Bearer ${token}`}
        })
        .then(response => {
            const data = response.data;
            console.log(data);
            window.open('/', '_self');
            // return <Redirect to="/" />
        })
        .catch(e => {
            console.log('something went wrong')
        });
    };

    render () {
        const { profiles, onBackClick } = this.props;

        return (
            < >
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
            {/* <Row>
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
        
                    <Button variant="danger" type="submit" onClick={handleUpdate}>Submit</Button>
                    {' '}
                    <Button variant="outline-secondary" className="button-float-right" onClick={() => { onBackClick(null); }}>Back</Button>
                </Col>
            </Row> */}
        </>  
        );
    }
}