import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import axiosInstance from "../../config/";

import Redirect, { Link } from "react-router-dom";

import "./registration-view.scss";

export default function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const [validateUser, setValidateUser] = useState("");
  const [validatePassword, setValidatePassword] = useState("");
  const [validateEmail, setValidateEmail] = useState("");
  const [validateBirthday, setValidateBirthday] = useState("");
  // const handleSubmit = (e) => {
  //     e.preventDefault();
  //     console.log(username, password. email, birthday);
  //     props.onRegister(username);
  // };

  const validateUsername = (e) => {
    if (e.target.value.length > 0 && e.target.length < 3) {
      setValidateUser("Username must be longer than 3 characters.");
    } else {
      setValidateUser("");
    }
    if (
      !e.currentTarget.value.match(/^[0-9a-zA-Z]+$/) &&
      e.target.value.length > 0
    ) {
      setValidateUser("Only alphanumeric characters are allowed!");
    }
  };

  const validatePasswordInput = (e) => {
    if (e.target.value.length > 0 && e.target.value.length < 8) {
      setValidatePassword("Password has to be at least 8 characters long");
    } else {
      setValidatePassword("");
    }
  };

  const validateEmailInput = (e) => {
    if (e.target.value.length > 0 && !e.target.value.match(/\S+@\S+\.\S+/)) {
      setValidateEmail("Invalid Email");
    } else {
      setValidateEmail("");
    }
  };

  const validateBirthdayInput = (e) => {
    if (
      e.target.value.length > 0 &&
      e.target.value.match(/^\d{2}-\d{2}-\d{4}$/)
    ) {
      setValidateBirthday(
        "Invalid date format, please use the format DD-MM-YYYY"
      );
    } else {
      setValidateBirthday("");
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    if (
      username.length === 0 ||
      password.length === 0 ||
      email.length === 0 ||
      birthday.length === 0
    ) {
      alert("Please fill all the fields");
      return false;
    }

    if (validateUser || validatePassword || validateEmail || validateBirthday) {
      alert("Incorrect input");
      return false;
    }

    axiosInstance
      .post("/users", {
        username: username,
        password: password,
        email: email,
        birthday: birthday,
      })
      .then((response) => {
        const data = response.data;
        console.log(data);
        window.open("/", "_self");
        // return <Redirect to="/" />
      })
      .catch((e) => {
        console.log("something went wrong");
      });
  };

  return (
    <Row className="reg-margin-top justify-content-md-center">
      <Col sm={12} md={6} lg={6} xl={4}>
        <Form.Group>
          <Form.Label controlid="username">Username: </Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value), validateUsername(e);
            }}
          />
          <span className="validation-feedback">{validateUser}</span>
        </Form.Group>
        <Form.Group>
          <Form.Label controlid="password">Password: </Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value), validatePasswordInput(e);
            }}
          />
          <span className="validation-feedback">{validatePassword}</span>
        </Form.Group>
        <Form.Group>
          <Form.Label controlid="email">eMail: </Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value), validateEmailInput(e);
            }}
          />
          <span className="validation-feedback">{validateEmail}</span>
        </Form.Group>
        <Form.Group>
          <Form.Label controlid="birthday">Date of Birth: </Form.Label>
          <Form.Control
            type="date"
            value={birthday}
            onChange={(e) => {
              setBirthday(e.target.value), validateBirthdayInput(e);
            }}
          />
          <span className="validation-feedback">{validateBirthday}</span>
        </Form.Group>
        <Button className="details-button" variant="danger" type="submit" onClick={handleRegister}>
          Submit
        </Button>{" "}
        <Link to={`/`}>
          <Button  variant="danger" className="details-button button-float-right">
            Back
          </Button>
        </Link>
      </Col>
    </Row>
  );
}
