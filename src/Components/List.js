import React from 'react';

const List = (props) => {
  const rows = [];
  props.items.forEach((item, i) => {
    if (item.onList) {
      rows.push(
        <ListItem
          key={i}
          id={item.id}
          item={item.item}
          price={item.price}
          priceType={item.priceType}
          brand={item.brand}
          location={item.location}
          servings={item.servings}
          onAdd={() => props.onAdd(item)}
        />
      );
    }
  });

  return (
    <div>
      <h1>List</h1>
      <div className="table-responsive">
        <table className="table table-sm table-striped table-hover">
          <thead>
            <tr>
              <th>Item</th>
              <th>Price</th>
              <th>Brand</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rows}
            <PriceTotal items={props.items}/>
          </tbody>
        </table>
      </div>
    </div>
  );
}

const ListItem = (props) => {
  return (
    <tr>
      <td>{props.item}</td>
      <td>{props.price}</td>
      <td>{props.brand}</td>
      {/* <td><button className="btn btn-success btn-sm" onClick={props.onList}>Add to Kitchen</button></td> */}
      <td><button className="btn btn-danger btn-sm" onClick={props.onAdd}>Delete</button></td>
    </tr>
  );
}

const PriceTotal = (props) => {
  let priceList = [];

  props.items.map((item) => {
    if (item.onList) {
      priceList.push(parseFloat(item.price));
    }
  })

  let priceTotal;

  if (priceList.length > 0) {
    priceList.reduce((total, price) => {
      priceTotal =  total + price;
    })
  }

  console.log(priceTotal);

  return (
    <tr>
      <td><strong>Total:</strong></td>
      <td><strong>{priceTotal}</strong></td>
    </tr>
  );
}

export default List;