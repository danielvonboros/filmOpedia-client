import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import axiosInstance from "../../config/";
import logo from '../../mat/filmopediaReactLogo.png'

import { Link } from "react-router-dom";

import "./login-view.scss";

export default function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    axiosInstance
      .post("/login", {
        username: username,
        password: password,
      })
      .then((response) => {
        const data = response.data;
        /* then call props.onLoggedIn(username), which provides the username to our parent component (child to parent communication) */
        props.onLoggedIn(data);
      })
      .catch((e) => {
        console.log("no such user");
      });
  };

  return (
    <Row className="login-margin-top justify-content-md-center">
      <Col sm={12} md={6} lg={6} xl={4}>
        <Form>
          <img src={logo} className="login-logo" alt='filmOpedia client'/>
          <p className='login-text'>not just another Internet movie database</p>
          <Form.Group controlId="formUsername">
            <Form.Label>Username: </Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password: </Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button className='details-button' variant="danger" type="submit" onClick={handleSubmit}>
            Submit
          </Button>{" "}
          <Link to={`/register`}>
            <Button
              variant="danger"
              className="details-button button-float-right"
              type="button"
            >
              Register
            </Button>
          </Link>
        </Form>
      </Col>
    </Row>
  );
}
