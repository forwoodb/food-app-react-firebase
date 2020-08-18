import React, {Component} from 'react';
import firebase from '../firebase.js';
import {Link} from 'react-router-dom';

export default class EditStoreItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      item: '',
      price: '',
      priceType: '',
      brand: '',
      location: '',
      servings: '',
    }
    this.handleItemChange = this.handleItemChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handlePriceTypeChange = this.handlePriceTypeChange.bind(this);
    this.handleBrandChange = this.handleBrandChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleServingsChange = this.handleServingsChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    firebase.database().ref('items/' + this.props.match.params.id).on('value', (snapshot) => {
      const data = snapshot.val();
      this.setState({
        id: data.id,
        item: data.item,
        price: data.price,
        priceType: data.priceType,
        brand: data.brand,
        location: data.location,
        servings: data.servings,
      })
    })
  }

  handleItemChange(e) {
    this.setState({
      item: e.target.value,
    })
    console.log(e.target.value);
  }

  handlePriceChange(e) {
    this.setState({
      price: e.target.value,
    })
  }

  handlePriceTypeChange(e) {
    this.setState({
      priceType: e.target.value,
    })
  }

  handleBrandChange(e) {
    this.setState({
      brand: e.target.value,
    })
  }

  handleLocationChange(e) {
    this.setState({
      location: e.target.value,
    })
  }

  handleServingsChange(e) {
    this.setState({
      servings: e.target.value,
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    const updateItem = {
      id: this.props.id,
      item: e.target.item.value,
      price: e.target.price.value,
      priceType: e.target.priceType.value,
      brand: e.target.brand.value,
      location: e.target.location.value,
      servings: e.target.servings.value,
      edit: false,
    }
    firebase.database().ref('items/' + updateItem.id).update(updateItem);
  }

  render() {
    console.log(this.state);
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-row">
          <div className="form-group col-md-4">
            <label htmlFor="item">Item</label>
            <input
              className="form-control"
              id="item"
              name="item"
              value={this.state.item}
              onChange={this.handleItemChange}
            />
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="price">Price</label>
            <input
              className="form-control"
              id="price"
              name="price"
              value={this.state.price}
              onChange={this.handlePriceChange}
            />
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="priceType">Price Type</label>
            <select
              className="form-control center-text"
              id="priceType"
              name="priceType"
              value={this.state.priceType}
              onChange={this.handlePriceTypeChange}
            >
              <option>Regular</option>
              <option>Sale</option>
              <option>Coupon</option>
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-4">
            <label htmlFor="brand">Brand</label>
            <input
              className="form-control"
              type="text"
              id="brand"
              name="brand"
              value={this.state.brand}
              onChange={this.handleBrandChange}
            />
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="location">Location</label>
            <input
              className="form-control"
              id="location"
              name="location"
              value={this.state.location}
              onChange={this.handleLocationChange}
            />
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="servings">Servings</label>
            <input
              className="form-control"
              id="servings"
              name="servings"
              value={this.state.servings}
              onChange={this.handleServingsChange}
            />
          </div>
        </div>
        <Link to={'/'}>
          <button className="btn btn-success">Done</button>
        </Link>
      </form>
    );
  }
}