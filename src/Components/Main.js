import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Main extends Component {
  render() {
    return (
      <div className="container">
        <NavBar/>
        <List items={this.props.items}/>
        <AddItem/>
        <Store items={this.props.items}/>
      </div>
    );
  }
}

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand">Food App</a>
      </nav>
    );
  }
}

class List extends Component {
  render() {
    return (
      <div>
        <h1>List</h1>
        <Table items={this.props.items}/>
      </div>
    );
  }
}

class AddItem extends Component {
  render() {
    return (
      <form>
        <div className="form-group">
          <input placeholder="Item"/>
          <input placeholder="Price"/>
          <input placeholder="Price Type"/>
        </div>
        <div className="form-group">
          <input placeholder="Brand"/>
          <input placeholder="Location"/>
          <input placeholder="Serving"/>
        </div>
          <button className="btn btn-success">Add To Store</button>
      </form>
    );
  }
}

class Store extends Component{
  render() {
    return (
      <div>
        <h1>Store</h1>
        <Table items={this.props.items}/>
      </div>
    );
  }
}

class Table extends Component {
  render() {
    const rows = [];
    this.props.items.forEach((item, i) => {
      rows.push(
        <TableRow
          key={i}
          item={item.item}
          price={item.price}
          priceType={item.priceType}
          brand={item.brand}
          location={item.location}
          servings={item.servings}
        />
      );
    });

    return (
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
    );
  }
}

class TableRow extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.item}</td>
        <td>{this.props.price}</td>
        <td>{this.props.priceType}</td>
        <td>{this.props.brand}</td>
        <td>{this.props.location}</td>
        <td>{this.props.servings}</td>
        <td><input type="checkbox"/></td>
        <td><button className="btn btn-primary">Edit</button></td>
        <td><button className="btn btn-danger">Delete</button></td>
      </tr>
    );
  }
}