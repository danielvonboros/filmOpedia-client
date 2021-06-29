import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./navbar.scss";

class NavBar extends Component {
  render() {
    return (
      <Navbar expand="lg" fixed="top">
        <Navbar.Brand>filmOpedia{"  "}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href={`/users/${this.props.thisUser}`}>{this.props.thisUser}</Nav.Link>
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

export default NavBar;
