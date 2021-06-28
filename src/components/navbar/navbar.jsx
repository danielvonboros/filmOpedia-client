import React, { Component } from "react";
import Link from "react-bootstrap/form";
import Button from "react-bootstrap/Button";
import "./navbar.scss";

class NavBar extends Component {
  state = {};

  render() {
    const fork = this.props.thisUser;
    let url3 = `/users/${fork}`;

    return (
      <nav className="navbar navbar-light">
        <h5>
          filmOpedia{"  "}
          <span className="span">not just another Internet Movie Database</span>
        </h5>
        <Link to={url3}>
          <Button
            variant="outline-secondary"
            className="button-float-right"
            type="button"
            // onClick={this.props.toProfile}
          >
            {this.props.thisUser}
          </Button>
        </Link>
        <Button
          variant="outline-secondary"
          className="button-float-right"
          type="button"
          onClick={this.props.onLogout}
        >
          Logout
        </Button>
      </nav>
    );
  }
}

export default NavBar;
