import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";
import { useHistory, useRouteMatch } from "react-router-dom";
import axiosInstance from "../../config";

import "./profile-view.scss";
import axios from "axios";

export function ProfileView({
  profiles,
  token,
  // deleteUser,
  // onUpdate,
  movies,
  onMovieDelete,
  onBackClick,
}) {
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newBirthday, setNewBirthday] = useState("");

  const [validateUser, setValidateUser] = useState("");
  const [validatePassword, setValidatePassword] = useState("");
  const [validateEmail, setValidateEmail] = useState("");
  const [validateBirthday, setValidateBirthday] = useState("");
  const [feedback, setFeedback] = useState("");

  const [user, setUser] = useState("");

  let history = useHistory();
  let router = useRouteMatch();

  useEffect(() => {
    axiosInstance
      .get(`/users/${router.params.username}`)
      .then((response) => {
        const data = response.data;
        console.log(data, "a");
        setUser(data);
      })
      .catch((e) => {
        console.log("User data could not be updated");
      });
  }, [router.params.username]);

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

  const clearForm = () => {
    setNewUsername("");
    setNewPassword("");
    setNewEmail("");
    setNewBirthday("");
  };

  const updateUser = (e) => {
    e.preventDefault();

    //Validate potential empty inputs
    if (
      newUsername.length === 0 ||
      newPassword.length === 0 ||
      newEmail.length === 0 ||
      newBirthday.length === 0
    ) {
      alert("Please fill all the fields");
      return false;
    }

    if (validateUser || validatePassword || validateEmail || validateBirthday) {
      alert("Incorrect input");
      return false;
    }

    let url = "https://filmopedia.herokuapp.com/users/" + profiles.username;
    console.log("url:", url);

    console.log("token:", token);
    //   console.log(url);

    axios
      .put(
        url,
        {
          username: newUsername,
          password: newPassword,
          email: newEmail,
          birthday: newBirthday,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        const data = response.data;
        // onUpdate(data);
        setFeedback("Your user data has been updated");
        clearForm();
        console.log(data.username);
        history.push(`/users/${data.username}`);
      })
      .catch((e) => {
        console.log("User data could not be updated");
        setFeedback("Submission failed");
      });
  };

  //   const handleUpdate = (e) => {
  //     e.preventDefault();
  /* Send a request to the server for authentication */
  //   };

  let url2 = "https://filmopedia.herokuapp.com/users/" + router.params.username;

  console.log(url2);

  const deleteAccount = () => {
    axios
      .delete(url2, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        console.log(`${user} has been deleted`);
      })
      .catch((e) => {
        console.log("An error occured");
        console.log(e);
      });
  };

  const addFavoriteMovie = (e) => {
    e.preventDefault();
    axios
      .post(
        `http://filmopedia.herokuapp.com/users/${username}/favoritemovies`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        const data = response.data;
        console.log(data);
        window.open("/", "_self");
      })
      .catch((e) => {
        console.log("something went wrong");
      });
  };

  const removeFavoriteMovie = (e) => {
    e.preventDefault();
    axios
      .delete(
        `http://filmopedia.herokuapp.com/users/${username}/favoritemovies`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
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

  // const { profiles, onBackClick } = this.props;

  return (
    <>
      <Row className="profile-info justify-content-center">
        <Col sm={12} md={10} lg={8} xl={6}>
          <div>
            <ul className="profile-view list-group">
              <li className="profile-username list-group-item">
                <span className="value profile-title">
                  Hello, {user.username}
                </span>
              </li>
              <li className="profile-email list-group-item">
                <span className="label">eMail: </span>
                <span className="value">{user.email}</span>
              </li>
              <li className="profile-birthday list-group-item">
                <span className="label">Birthday: </span>
                <span className="value">{user.birthday}</span>
              </li>
              <li className="profile-favoritemovies list-group-item">
                <span className="label">Favorite Movies: </span>
                <span className="value">{user.favoritemovies}</span>
              </li>
              <li className="list-group-item">
                <Button
                  className="button-float-right"
                  variant="outline-danger"
                  onClick={() => onBackClick()}
                >
                  Back
                </Button>
              </li>
            </ul>
          </div>
        </Col>
      </Row>
      <hr />
      <Row className="justify-content-center">
        <Col sm={12} md={10} lg={8} xl={6}>
          <div className="profile-title">Update User Info</div>
          <ul className="update-info update-user-account list-group">
            <Form>
              <li className="list-group-item">
                <Form.Group>
                  <Form.Label controlid="newUsername">
                    New Username:{" "}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={newUsername}
                    onChange={(e) => {
                      setNewUsername(e.target.value), validateUsername(e);
                    }}
                  />
                  <span className="validation-feedback">{validateUser}</span>
                </Form.Group>
              </li>
              <li className="list-group-item">
                <Form.Group>
                  <Form.Label controlid="newPassword">
                    New Password:{" "}
                  </Form.Label>
                  <Form.Control
                    type="password"
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value), validatePasswordInput(e);
                    }}
                  />
                  <span className="validation-feedback">
                    {validatePassword}
                  </span>
                </Form.Group>
              </li>
              <li className="list-group-item">
                <Form.Group>
                  <Form.Label controlid="newEmail">New eMail: </Form.Label>
                  <Form.Control
                    type="email"
                    value={newEmail}
                    onChange={(e) => {
                      setNewEmail(e.target.value), validateEmailInput(e);
                    }}
                  />
                  <span className="validation-feedback">{validateEmail}</span>
                </Form.Group>
              </li>
              <li className="list-group-item">
                <Form.Group>
                  <Form.Label controlid="newBirthday">
                    New Birthday:{" "}
                  </Form.Label>
                  <Form.Control
                    type="date"
                    value={newBirthday}
                    onChange={(e) => {
                      setNewBirthday(e.target.value), validateBirthdayInput(e);
                    }}
                  />
                  <span className="validation-feedback">
                    {validateBirthday}
                  </span>
                </Form.Group>
              </li>
            </Form>
            <li className="list-group-item">
              <Button variant="danger" type="submit" onClick={updateUser}>
                Update User
              </Button>{" "}
              <Button
                variant="danger"
                className="button-float-right"
                type="submit"
                onClick={() => console.log(deleteAccount)}
              >
                DELETE USER
              </Button>
            </li>
            <li className="list-group-item">
              <Button
                variant="outline-secondary"
                className="button-float-right"
                onClick={() => {
                  onBackClick(null);
                }}
              >
                Back
              </Button>
            </li>
          </ul>
        </Col>
      </Row>
    </>
  );
}

ProfileView.propTypes = {
  // profiles: PropTypes.shape({
  //   username: PropTypes.string.isRequired,
  //   password: PropTypes.string.isRequired,
  //   email: PropTypes.string.isRequired,
  //   birthday: PropTypes.string.isRequired,
  // }).isRequired,

  token: PropTypes.string.isRequired,
  // onUpdate: PropTypes.func.isRequired,
  onMovieDelete: PropTypes.func.isRequired,
};
