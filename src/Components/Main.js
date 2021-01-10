import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import firebase from '../firebase.js';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import EditStoreItem from './EditItem.js';
import NavBar from './NavBar.js';
import AddItem from './AddItem.js';
import List from './List.js';
import Store from './Store.js';
import Meal from './Meal.js';
import Kitchen from './Kitchen.js';

export default class Main extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      list: [],
      kitchen: [],
      meal: [],
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
    firebase.database().ref('items/' + listItem.id).update(listItem);
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
    firebase.database().ref('items/' + listItem.id).update(listItem);
  }

  addToMeal(mealItem) {
    this.setState({
      items: this.state.items.map((item) => {
        if (item.id === mealItem.id) {
          item.onMeal = !item.onMeal
        }
        return item;
      })
    })
    firebase.database().ref('items/' + mealItem.id).update(mealItem);
  }

  componentDidMount() {
    firebase.database().ref('items').on('value', (snapshot) => {
      let data = snapshot.val();
      let items = [];
      let user;

      if (this.props.user) {
        user = this.props.user;
      } else {
        user = 'Demo';
      }

      for (var item in data) {
        if (data[item].user === user) {
          items.push({
            id: item,
            ...data[item]
          })
        }
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
    firebase.database().ref('items/' + editItem.id).update(editItem);
  }

  render() {
    return (
      <div className="container">
        <Router>
          <NavBar
            user={this.props.user}
            login={this.props.login}
            logout={this.props.logout}
          />
          <Route exact path={'/'}>
            <List
              user={this.props.user}
              items={this.state.items}
              onList={(listItem) => this.addToList(listItem)}
            />
            <AddItem user={this.props.user}/>
            <Store
              user={this.props.user}
              items={this.state.items}
              onList={(listItem) => this.addToList(listItem)}
              onDelete={(delItem) => this.deleteItem(delItem)}
              onEdit={(editItem) => this.editItem(editItem)}
            />
          </Route>
          <Route path={'/Kitchen'}>
            <Meal
              user={this.props.user}
              items={this.state.items}
              onMeal={(mealItem) => this.addToMeal(mealItem)}
            />
            <Kitchen
              user={this.props.user}
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

