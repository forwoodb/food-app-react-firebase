import React from 'react';
import './App.css';
import Main from './Components/Main.js';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Main items={items}/>
    </div>
  );
}

const items = [
  {
    item: 'apples',
    price: 4.99,
    priceType: 'Regular',
    brand: 'Golden Delicious',
    location: 'Family Fare',
    servings: 8,
  },
  {
    item: 'bananas',
    price: 0.59,
    priceType: 'Regular',
    brand: 'Dole',
    location: 'Family Fare',
    servings: 2,
  },
]

export default App;
