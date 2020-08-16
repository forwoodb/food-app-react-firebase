import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import firebase from '../firebase.js';

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
      console.log(snapshot.val());
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
    console.log(this.state.items);
    return (
      <div className="container">
        <NavBar/>
        <List items={this.state.items}/>
        <AddItem
        />
        <Store
          items={this.state.items}
          onList={(listItem) => this.addToList(listItem)}
          onDelete={(delItem) => this.deleteItem(delItem)}
          onEdit={(editItem) => this.editItem(editItem)}
        />
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
        <div className="form-group">
          <input name="itemText" placeholder="Item"/>
          <input name="price" placeholder="Price"/>
          <select name="priceType">
            <option>Regular</option>
            <option>Sale</option>
            <option>Coupon</option>
          </select>
        </div>
        <div className="form-group">
          <input name="brand" placeholder="Brand"/>
          <input name="location" placeholder="Location"/>
          <input name="servings" placeholder="Serving"/>
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
        <td><button className="btn btn-success" onClick={this.props.onList}>Add</button></td>
        <td><button className="btn btn-primary" onClick={this.props.onEdit}>Edit</button></td>
        <td><button className="btn btn-danger" onClick={this.props.onDelete}>Delete</button></td>
      </tr>
    );
  }
}

class EditStoreItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: this.props.item,
      price: this.props.price,
      priceType: this.props.priceType,
      brand: this.props.brand,
      location: this.props.location,
      servings: this.props.servings,
    }
  }
  render() {
    return (
      <tr>
        <td>{this.props.item}</td>
        <td>{this.props.price}</td>
        <td>{this.props.priceType}</td>
        <td>{this.props.brand}</td>
        <td>{this.props.location}</td>
        <td>{this.props.servings}</td>
        <td><button className="btn btn-success" onClick={this.props.onList}>Add</button></td>
        <td><button className="btn btn-primary" onClick={this.props.onEdit}>Edit</button></td>
        <td><button className="btn btn-danger" onClick={this.props.onDelete}>Delete</button></td>
      </tr>
    );
  }
}