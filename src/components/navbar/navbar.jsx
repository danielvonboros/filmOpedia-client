import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./navbar.scss";
import logo from 'https://raw.githubusercontent.com/danielvonboros/filmOpedia-client/Redux/src/mat/filmopediaReactLogoRosa.png';



class NavBar extends Component {

  render() {
    const { username } = this.props.user.user;
    return (
      <Navbar expand="lg" fixed="top">
        <img src={logo} alt='filmOpedia React' className="navbar-logo" />
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link className="nav-link-light" href="/">Home</Nav.Link>
            <Nav.Link className="nav-link-light" href={`/users/${username}`}>{username}</Nav.Link>
            <Nav.Link className="nav-link-light">
              <Button
                variant="danger"
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
