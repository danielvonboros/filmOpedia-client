import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./navbar.scss";

class NavBar extends Component {
  render() {
    const { username } = this.props.user.user;
    return (
      <Navbar expand="lg" fixed="top">
        <Navbar.Brand>filmOpedia{"  "}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href={`/users/${username}`}>{username}</Nav.Link>
            <Nav.Link>
              <Button
                variant="outline-secondary"
                className="button-float-right"
                type="button"
                onClick={this.props.onLogout}
              >
                Logout
              </Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

let mapStateToProps = (state) => {
  return { user: state.user };
};

export default connect(mapStateToProps)(NavBar);
