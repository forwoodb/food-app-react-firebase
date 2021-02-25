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
import Test from './Test.js';

export default class Main extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
    }
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

  addToList(storeItem) {
    this.setState({
      items: this.state.items.map((item) => {
        if (item.id === storeItem.id) {
          item.onList = !item.onList
        }
        return item;
      })
    })
    firebase.database().ref('items/' + storeItem.id).update(storeItem);
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
              onAdd={(storeItem) => this.addToList(storeItem)}
            />
            <AddItem user={this.props.user}/>
            <Store
              user={this.props.user}
              items={this.state.items}
              onAdd={(storeItem) => this.addToList(storeItem)}
              onDelete={(delItem) => this.deleteItem(delItem)}
              onEdit={(editItem) => this.editItem(editItem)}
            />
          </Route>
          <Route path={'/Kitchen'}>
            <Meal
              user={this.props.user}
              items={this.state.items}
            />
            <Kitchen
              user={this.props.user}
              items={this.state.items}
              onAdd={(storeItem) => this.addToList(storeItem)}
              onDelete={(delItem) => this.deleteItem(delItem)}
              onEdit={(editItem) => this.editItem(editItem)}
            />
          </Route>
          <Route path='/test'>
            <Test onAdd={(storeItem) => this.addToList(storeItem)}/>
          </Route>
          <Route path='/Edit/:id' exact component={EditStoreItem}/>
        </Router>
      </div>
    );
  }
}

