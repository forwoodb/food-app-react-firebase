import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class NavBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">Food App</a>
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to={'/'}>List</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={'/AddItem'}>Add Item</Link>
          </li>
          <li>
            {
              this.props.user ?
              <button onClick={this.props.logout} className="btn">Log Out</button>
              : 
              <button onClick={this.props.login} className="btn">Log In</button>
            }
          </li>
        </ul>
      </nav>
    );
  }
}