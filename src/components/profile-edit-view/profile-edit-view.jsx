import React, {useState, useContext} from "react";
import axios from "axios";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useHistory } from "react-router";

import LoadingView from "../loading-view/loading-view";

import { AuthData } from "../context/context";
import { BASE_PATH } from "../../utils/constants/endpoints";
import { ROUTE_USER } from "../../utils/constants/routes";

export default function ProfileEditView() {
    const [newUsername, setUsername] = useState('');
    const [newPassword, setPassword] = useState('');
    const [newEmail, setEmail] = useState('');
    const [newBirthday, setBirthday] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const authData = useContext(AuthData).authData;

    let data = JSON.stringify({
        username: newUsername,
        password: newPassword,
        email: newEmail,
        birthday: newBirthday
    });

    var config = {
        method: 'put',
        url: `${BASE_PATH}/users/id/${authData.user._id}`,
        headers: { 
          'Authorization': `Bearer ${authData.token}`,
          'Content-Type': 'application/json'
        },
        data : data
      };

    function handleUpdateProfile() {
        setLoading(true);
        axios(config).then(() => { 
            history.push(`${ROUTE_USER}/${authData.user._id}`)
        }).catch( (e) => {
            console.log(e);
            setLoading(false);
            alert('an error occured. please try again later');
        })
        
    }

    if (loading) {
        return <LoadingView />
    }

    return(
        <Row className="justify-content-center">
        <Col sm={12} md={10} lg={8} xl={6}>
        <Form>
            <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control type='username' name='username' onChange={(e) => setUsername(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' name='password' onChange={(e) => setPassword(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control type='email' name='email' onChange={(e) => setEmail(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Birthday</Form.Label>
                <Form.Control type='date' name='birthday' onChange={(e) => setBirthday(e.target.value)}></Form.Control>
            </Form.Group>
            <Button variant="btn btn-danger" onClick={() => handleUpdateProfile()}>Update Profile</Button>
            <Button className="button-float-right" variant="btn btn-outline-danger" onClick={() => history.goBack()} >Cancel</Button>
        </Form>
        </Col>
        </Row>
    )
}