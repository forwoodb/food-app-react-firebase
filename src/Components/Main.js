import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import firebase from '../firebase.js';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import EditStoreItem from './EditItem.js'

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
    // console.log('items/' + listItem);
    firebase.database().ref('items/' + listItem.id).update(listItem);
  }

  componentDidMount() {
    firebase.database().ref('items').on('value', (snapshot) => {
      // console.log(snapshot.val());
      let data = snapshot.val();
      let items = [];

      for (var item in data) {
        items.push({
          id: item,
          ...data[item]
        })
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
    // console.log('items/' + editItem);
    firebase.database().ref('items/' + editItem.id).update(editItem);
  }

  render() {
    // console.log(this.state.items);
    return (
      <div className="container">
        <NavBar/>
        <Router>
          <Route exact path={'/'}>
            <List items={this.state.items}/>
            <AddItem/>
            <Store
              items={this.state.items}
              onList={(listItem) => this.addToList(listItem)}
              onDelete={(delItem) => this.deleteItem(delItem)}
              onEdit={(editItem) => this.editItem(editItem)}
            />
          </Route>
          <Route path='/Edit/:id' exact component={EditStoreItem}/>
        </Router>
      </div>
    );
  }
}

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">Food App</a>
      </nav>
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
        <td><button className="btn btn-danger">Delete</button></td>
      </tr>
    );
  }
}

class AddItem extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const newItem = {
      item: e.target.itemText.value,
      price: e.target.price.value,
      priceType: e.target.priceType.value,
      brand: e.target.brand.value,
      location: e.target.location.value,
      servings: e.target.servings.value,
      onList: false,
      edit: false,
    }
    firebase.database().ref('items').push(newItem);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-row">
          <div className="form-group col">
            <input className="form-control" name="itemText" placeholder="Item"/>
          </div>
          <div className="form-group col">
            <input className="form-control" name="price" placeholder="Price"/>
          </div>
          <div className="form-group col">
            <select className="form-control" name="priceType">
              <option>Regular</option>
              <option>Sale</option>
              <option>Coupon</option>
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col">
            <input className="form-control" name="brand" placeholder="Brand"/>
          </div>
          <div className="form-group col">
            <input className="form-control" name="location" placeholder="Location"/>
          </div>
          <div className="form-group col">
            <input className="form-control" name="servings" placeholder="Serving"/>
          </div>
        </div>
        <button className="btn btn-success">Add To Store</button>
      </form>
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