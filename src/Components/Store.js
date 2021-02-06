import React from 'react';
import {Link} from 'react-router-dom';
import ItemData from './ItemData';
import ItemList from './ItemList';
import ItemButtons from './ItemButtons';

export default function Store(props) {
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
      <div className="row">
          <ItemList
            items={props.items}
          />
          <ItemData
            items={props.items}
          />
          <ItemButtons
            items={props.items}
          />
      </div>
    </div>
  );
}

