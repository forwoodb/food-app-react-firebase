import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Store extends Component {
  render() {
    function compare(a,b) {
      let comparison = 0;
      if (a.item > b.item) {
        comparison = 1;
      } else if (a.item < b.item) {
        comparison = -1;
      }
      return comparison;
    }

    return (
      <div>
        <h1>Store</h1>
          {
            this.props.items.sort(compare).map((item) =>
              <StoreItem
                key={item.id}
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
            )
          }
      </div>
    );
  }
}

function StoreItem(props) {

    return (
      <div className="card text-center" key={props.id}>
        <div className="card-body">
          <h4 className="card-title">{props.item}</h4>
          <table className="table">
            <tbody>
              <tr>
                <td className="text-right">Brand:</td>
                <td className="text-left">{props.brand}</td>
                <td className="text-right">Price:</td>
                <td className="text-left">{props.price}</td>
              </tr>
              <tr>
                <td className="text-right">Location:</td>
                <td className="text-left">{props.location}</td>
                <td className="text-right">Price Type:</td>
                <td className="text-left">{props.priceType}</td>
              </tr>
              <tr>
                <td className="text-right">Servings:</td>
                <td className="text-left">{props.servings}</td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
          <div className="row">
            <div className="col text-left">
              <button className="btn btn-success" onClick={props.onList}>
                Add to List
              </button>
            </div>
            <div className="col text-center">
              <Link to={'/Edit/' + props.id}>
              <button type="button" className="btn btn-primary">
                Edit Item
              </button>
              </Link>
            </div>
            <div className="col text-right">
              <button className="btn btn-danger" onClick={props.onDelete}>
                Delete Item
              </button>
            </div>
          </div>
        </div>
      </div>
    );
}