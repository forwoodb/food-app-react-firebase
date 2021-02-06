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
        <table className="table table-striped table-hover">
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
    );
  }
}

function ListItem(props) {
  return (
    <tr>
      <td>{props.item}</td>
      <td>{props.price}</td>
      <td>{props.brand}</td>
      <td>{props.location}</td>
      <td>{props.priceType}</td>
      <td>{props.servings}</td>
      <td><button className="btn btn-success" onClick={props.onList}>Add to Kitchen</button></td>
      <td><button className="btn btn-danger" onClick={props.onAdd}>Delete</button></td>
    </tr>
  );
}