import React, {Component} from 'react';

export default class List extends Component {
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
            onAdd={() => this.props.onAdd(item)}
          />
        );
      }
    });

    return (
      <div>
        <h1>List</h1>
        <div className="table-responsive">
          <table className="table table-sm table-striped table-hover">
            <thead>
              <tr>
                <th>Item</th>
                <th>Price</th>
                <th>Brand</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </table>
        </div>
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
        <td>{this.props.brand}</td>
        {/* <td><button className="btn btn-success btn-sm" onClick={this.props.onList}>Add to Kitchen</button></td> */}
        <td><button className="btn btn-danger btn-sm" onClick={this.props.onAdd}>Delete</button></td>
      </tr>
    );
  }
}