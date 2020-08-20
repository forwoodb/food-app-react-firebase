import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import firebase from '../firebase.js';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import EditStoreItem from './EditItem.js';
import NavBar from './NavBar.js';
import AddItem from './AddItem.js';

export default class Main extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
    }
  }

  addToList(listItem) {
    this.setState({
      items: this.state.items.map((item) => {
        if (item.id === listItem.id) {
          item.onList = !item.onList
        }
        return item;
      })
    })
    firebase.database().ref('items/' + listItem.id).update(listItem);
  }

  componentDidMount() {
    firebase.database().ref('items').on('value', (snapshot) => {
      let data = snapshot.val();
      let items = [];
      let user;

      if (this.props.user) {
        user = this.props.user;
      } else {
        user = 'Demo';
      }

      for (var item in data) {
        if (data[item].user === user) {
          items.push({
            id: item,
            ...data[item]
          })
        }
      }

      this.setState({
        items,
      })
    });
  }

  deleteItem(delItem) {
    firebase.database().ref('items/' + delItem.id).remove();
  }

  editItem(editItem) {
    this.setState({
      items: this.state.items.map((item) => {
        if (item.id === editItem.id) {
          item.edit = !item.edit
        }
        return item;
      })
    })
    firebase.database().ref('items/' + editItem.id).update(editItem);
  }

  render() {
    return (
      <div className="container">
        <Router>
          <NavBar
            user={this.props.user}
            login={this.props.login}
            logout={this.props.logout}
          />
          <Route exact path={'/'}>
            <List
              user={this.props.user}
              items={this.state.items}
              onList={(listItem) => this.addToList(listItem)}
            />
            <AddItem user={this.props.user}/>
            <Store
              user={this.props.user}
              items={this.state.items}
              onList={(listItem) => this.addToList(listItem)}
              onDelete={(delItem) => this.deleteItem(delItem)}
              onEdit={(editItem) => this.editItem(editItem)}
            />
          </Route>
          <Route path={'/AddItem'}>
          </Route>
          <Route path='/Edit/:id' exact component={EditStoreItem}/>
        </Router>
      </div>
    );
  }
}



class List extends Component {
  render() {
    const rows = [];
    this.props.items.forEach((item, i) => {
      if (item.onList) {
        rows.push(
          <ListItem
            key={i}
            id={item.id}
            item={item.item}
            price={item.price}
            priceType={item.priceType}
            brand={item.brand}
            location={item.location}
            servings={item.servings}
            onList={() => this.props.onList(item)}
          />
        );
      }
    });

    return (
      <div>
        <h1>List</h1>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Item</th>
              <th>Price</th>
              <th>Price Type</th>
              <th>Brand</th>
              <th>Location</th>
              <th>Servings</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    );
  }
}

class ListItem extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.item}</td>
        <td>{this.props.price}</td>
        <td>{this.props.priceType}</td>
        <td>{this.props.brand}</td>
        <td>{this.props.location}</td>
        <td>{this.props.servings}</td>
        <td><button className="btn btn-danger" onClick={this.props.onList}>Delete</button></td>
      </tr>
    );
  }
}

class Store extends Component {
  render() {
    const rows = [];
    this.props.items.forEach((item, i) => {
      rows.push(
        <StoreItem
          key={i}
          id={item.id}
          item={item.item}
          price={item.price}
          priceType={item.priceType}
          brand={item.brand}
          location={item.location}
          servings={item.servings}
          onList={() => this.props.onList(item)}
          onDelete={() => this.props.onDelete(item)}
          onEdit={() => this.props.onEdit(item)}
        />
      );
  });

    return (
      <div>
        <h1>Store</h1>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Item</th>
              <th>Price</th>
              <th>Price Type</th>
              <th>Brand</th>
              <th>Location</th>
              <th>Servings</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    );
  }
}

class StoreItem extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.item}</td>
        <td>{this.props.price}</td>
        <td>{this.props.priceType}</td>
        <td>{this.props.brand}</td>
        <td>{this.props.location}</td>
        <td>{this.props.servings}</td>
        <td>
          <button className="btn btn-success" onClick={this.props.onList}>
            Add
          </button>
        </td>
        <td>
          <Link to={'/Edit/' + this.props.id}>
          <button type="button" className="btn btn-primary">
            Edit
          </button>
          </Link>
        </td>
        <td>
          <button className="btn btn-danger" onClick={this.props.onDelete}>
            Delete
          </button>
        </td>
      </tr>
    );
  }
}