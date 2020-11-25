import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

export default class NavBar extends Component {
  render() {
    return (
      <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Food App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link className="nav-link" to={'/'}>Store</Link>
            <Link className="nav-link" to={'/Kitchen'}>Kitchen</Link>
            {
              this.props.user ?
              <button onClick={this.props.logout} className="btn">Log Out</button>
              :
              <button onClick={this.props.login} className="btn">Log In</button>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      </div>
    );
  }
}