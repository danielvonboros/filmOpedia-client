import React, {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import './profile-view.scss';
import axios from 'axios';
import { propTypes } from 'react-bootstrap/esm/Image';

export function ProfileView ({ userProfile, token, onDelete, onUpdate, movies, onMovieDelete }) {

    const [ newUsername, updateUsername ] = useState('');
    const [ newPassword, updatePassword ] = useState('');
    const [ newEmail, updateEmail ] = useState('');
    const [ newBirthday, updateBirthday ] = useState('');

    const [ validateUser, setValidateUser ] = useState('');
    const [ validatePassword, setValidatePassword ] = useState('');
    const [ validateEmail, setValidateEmail ] = useState('');
    const [ validateBirthday, setValidateBirthday ] = useState('');
    const [ feedback, setFeedback ] = useState('');

    const validateUsername = (e) => {
        if (e.target.value.length > 0 && e.target.length < 3) {
            setValidateUser('Username must be longer than 3 characters.');
        } else {
            setValidateUser('');
        }
        if (e.currentTarget.value.match(/^[0-9a-zA-Z]+$/) && e.target.value.length > 0) {
            setValidateUser('Only alphanumeric characters are allowed!')
        }
        }
    }

    const validatePassword = (e) => {
        if (e.target.value.length > 0 && e.target.value.length < 8) {
            setValidatePassword('Password has to be at least 8 characters long')
        } else {
            setValidatePassword('');
        }
    }

    const validateEmail = (e) => {
        if (e.target.value.length > 0 && e.target.value.match(/\S+@\S+\.\S+/)) {
            setValidateEmail('Invalid Email')
        } else {
            setValidateEmail('');
        }
    }
    const validateBirthday = (e) => {
        if (e.target.value.length > 0 && e.target.value.match(/^\d{4}-\d{2}-\d{2}$/)) {
            setValidateBirthday('Invalid date format, please use the format YYYY-MM-DD')
        } else {
            setValidateBirthday('');
        }
    }

    const updateUser = (e) => {
        e.preventDefault();

        //Validate potential empty inputs
        if ( newUsername.length===0 || newPassword.length===0 || newEmail.length===0 || newBirthday.length===0 ) {
            alert('Please fill all the fields')
            return false
        }

        if ( validateUser || validatePassword || validateEmail || validateBirthday ) {
            alert('Incorrect input')
            return false
        }
    };

    const clearForm = () => {
        updateUsername('');
        updatePassword('');
        updateEmail('');
        updateBirthday('')
    }

    axios.put('http://filmopedia.herokuapp.com/users',{
        headers: { Authorization:  `Bearer ${token}` }},
        {
            username: newUsername,
            password: newPassword,
            email: newEmail,
            birthday: newBirthday
        }
    )
    .then(response => {
        const data = response.data;
        console.log(data)
        onUpdate(data)
        setFeedback('Your user data has been updated')
        clearForm()
    })
    .catch(e => {
        console.log('User data could not be updated')
        setFeedback('Submission failed')
    });
    
    
    handleUpdate = (e) => {
        e.preventDefault();
        /* Send a request to the server for authentication */
       

    const deleteAccount = () => {
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
        axios.post(`http://filmopedia.herokuapp.com/users/${username}/favoritemovies`, {
            headers: { Authorization: `Bearer ${token}`}
        })
        .then(response => {
            const data = response.data
            console.log(data)
            window.open('/', '_self')
        })
        .catch(e => {
            console.log('something went wrong')
        });
    };

    removeFavoriteMovie = (e) => {
        e.preventDefault();
        axios.delete(`http://filmopedia.herokuapp.com/users/${username}/favoritemovies`, {
            headers: { Authorization: `Bearer ${token}`}
        })
        .then(response => {
            const data = response.data
            console.log(data)
            window.open('/', '_self')
            // return <Redirect to="/" />
        })
        .catch(e => {
            console.log('something went wrong')
        });
    };

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
                            <span className="value">{ profiles.birthday.slice(0,10) }</span>
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
            <Row>
                <Col sm={12} md={6} lg={6} xl={4}>
                    <Form className="update-user-account">
                    <Form.Group>
                        <Form.Label controlId="newUsername">New Username: </Form.Label>
                        <Form.Control type="text" value={newUsername} onChange={e => {updateUsername(e.target.value), validateUsername(e)}} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label controlId="newPassword">New Password: </Form.Label>
                        <Form.Control type="password" value={newPassword} onChange={e => {updatePassword(e.target.value), validatePassword(e)}} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label controlId="newEmail">New eMail: </Form.Label>
                        <Form.Control type="email" value={newEmail} onChange={e => {updateEmail(e.target.value), validateEmail(e)}} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label controlId="newBirthday">New Birthday: </Form.Label>
                        <Form.Control type="date" value={newBirthday} onChange={e => {updateBirthday(e.target.value), validateBirthday(e)}} />
                    </Form.Group>
                    </Form>
        
                    <Button variant="danger" type="submit" onClick={handleUpdate}>Submit</Button>
                    {' '}
                    <Button variant="outline-secondary" className="button-float-right" onClick={() => { onBackClick(null); }}>Back</Button>
                </Col>
            </Row>
        </>  
        );
    }

    ProfileView.propTypes = {
        userProfile: PropTypes.shape({
            username: PropTypes.string.isRequired,
            password: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired,
            birthday: PropTypes.Date.isRequired
        }).isRequired,
    
    token: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onMovieDelete: PropTypes.func.isRequired,
    }