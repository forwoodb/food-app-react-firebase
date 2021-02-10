import React from 'react';
import {Link} from 'react-router-dom';

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
      <div className="table-responsive">
      <table className="table table-sm">
        <StoreHeader/>
          {
            props.items.sort(compare).map((item) =>
              <StoreItem
                key={item.id}
                id={item.id}
                item={item.item}
                price={item.price}
                priceType={item.priceType}
                brand={item.brand}
                location={item.location}
                servings={item.servings}
                onList={item.onList}
                onAdd={() => props.onAdd(item)}
                onDelete={() => props.onDelete(item)}
                onEdit={() => props.onEdit(item)}
              />
            )
          }
      </table>
      </div>
    </div>
  );
}

function StoreHeader() {
  return (
    <thead>
      <tr>
        <td className="text-right"></td>
        <td className="text-right">Item</td>
        <td className="text-right">Brand</td>
        <td className="text-right">Price</td>
        <td className="text-right">Location</td>
        <td className="text-right">Price Type</td>
        <td className="text-right">Servings</td>
        <td className="text-right"></td>
        <td className="text-right"></td>
      </tr>
    </thead>
  );
}

function StoreItem(props) {
  return (
    <tbody>
      <tr key={props.id}>
        <td className="text-left">
          <Button onList={props.onList} onAdd={props.onAdd}/>
        </td>
        <td className="text-left">{props.item}</td>
        <td className="text-left">{props.brand}</td>
        <td className="text-left">{props.price}</td>
        <td className="text-left">{props.location}</td>
        <td className="text-left">{props.priceType}</td>
        <td className="text-left">{props.servings}</td>
        <td className="text-left">
          <Link to={'/Edit/' + props.id}>
            <button type="button" className="btn btn-primary btn-sm">
              Edit
            </button>
          </Link>
        </td>
        <td className="text-left">
          <button className="btn btn-danger btn-sm" onClick={props.onDelete}>
            Del
          </button>
        </td>
      </tr>
    </tbody>
  );
}

function Button(props) {
  let button;
  let style;

  if (props.onList) {
    button = "Rem"
    style = "warning"
  } else {
    button = "Add"
    style = "success"
  }

  return (
    <button className={`btn btn-${style} btn-sm`} onClick={props.onAdd}>
      {button}
    </button>
  );
}