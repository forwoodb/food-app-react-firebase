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

    e.target.elements.itemText.value = '';
    e.target.elements.price.value = '';
    e.target.elements.brand.value = '';
    e.target.elements.location.value = '';
    e.target.elements.servings.value = '';
    // window.location = '/';
  }

  render() {
    return (
      <div className="mt-5 mb-5">
        <h1>Add Item</h1>
        <form className="row g-3" onSubmit={this.handleSubmit}>
          <div className="input-group-sm">
            <input className="form-control" name="itemText" placeholder="Item"/>
          </div>
          <div className="col-4 input-group-sm">
            <input className="form-control" name="price" placeholder="Price"/>
          </div>
          <div className="col-4 input-group-sm">
            <select className="form-control" name="priceType">
              <option>Regular</option>
              <option>Sale</option>
              <option>Coupon</option>
            </select>
          </div>
          <div className="col-4 input-group-sm">
            <input className="form-control" name="servings" placeholder="Servings"/>
          </div>
          <div className="col-6 input-group-sm">
            <input className="form-control" name="brand" placeholder="Brand"/>
          </div>
          <div className="col-6 input-group-sm">
            <input className="form-control" name="location" placeholder="Location"/>
          </div>
          <div className="d-grid d-sm-block">
            <button className="btn btn-success btn-sm">Add To Store</button>
          </div>
        </form>
      </div>
    );
  }
}