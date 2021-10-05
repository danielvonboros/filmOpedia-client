import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import axios from "axios";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import LoadingView from '../loading-view/loading-view';

import "./login-view.scss";
import { AuthData } from "../context/context";
import {ENDPOINT_LOGIN} from '../../utils/constants/endpoints';
import { ROUTE_MAIN } from "../../utils/constants/routes";

export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); 

  const history = useHistory();
  const authData = useContext(AuthData);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    axios
      .post(ENDPOINT_LOGIN, {
        username: username,
        password: password,
      })
      .then((response) => {
        const data = response.data;
        console.log("login-view",data);
        history.push(ROUTE_MAIN);
        authData.setAuthData(data);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  };

  if (loading) {
    return <LoadingView />
  }

  return (
    <Row className='login-margin-top justify-content-md-center' >
      <Col sm={12} md={8} lg={8} xl={6}>
        <Form>
          <Form.Group controlId='formUsername'>
            <Form.Label>Username: </Form.Label>
            <Form.Control
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId='formPassword'>
            <Form.Label>Password: </Form.Label>
            <Form.Control
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant='danger' type='submit' onClick={handleSubmit}>
            Submit
          </Button>{" "}
          <Button
            variant='outline-secondary'
            className='button-float-right'
            type='button'
            onClick={props.toggleRegister}>
            Register
          </Button>
        </Form>
      </Col>
    </Row>
  );
}
