import React, {Component} from 'react';

export default class Meal extends Component {
  render() {
    const rows = [];
    this.props.items.forEach((item, i) => {
      if (item.onMeal) {
        rows.push(
          <MealItem
            key={i}
            id={item.id}
            item={item.item}
            price={item.price}
            priceType={item.priceType}
            brand={item.brand}
            location={item.location}
            servings={item.servings}
            onMeal={() => this.props.onMeal(item)}
          />
        );
      }
    });

    return (
      <div>
        <h1>Meal</h1>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Item</th>
              <th>Price</th>
              <th>Brand</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    );
  }
}

class MealItem extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.item}</td>
        <td>{this.props.price}</td>
        <td>{this.props.brand}</td>
        <td><button className="btn btn-danger" onClick={this.props.onMeal}>Delete</button></td>
      </tr>
    );
  }
}