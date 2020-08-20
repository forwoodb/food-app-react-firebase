import React, {Component} from 'react';
import firebase from '../firebase.js';

export default class AddItem extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const newItem = {
      user: this.props.user ? this.props.user : 'Demo',
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
    // window.location = '/';
  }

  render() {
    return (
      <div className="mt-3 mb-3">
        <h1>Add Item</h1>
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
      </div>
    );
  }
}