import React from 'react';

export default function ItemList(props) {
  return (
    <table className="table">
      <thead>
        <tr>
          <td className="text-right"></td>
          <td className="text-right">Item</td>
        </tr>
      </thead>
      <tbody>
      {
        props.items.map((item) => {
          return <tr key={item.id}>
            <td className="text-left">
              <Button onList={item.onList} onAdd={item.onAdd}/>
            </td>
            <td className="text-left">{item.item}</td>
          </tr>
        })
      }
      </tbody>
    </table>
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
    <button className={`btn btn-${style}`} onClick={props.onAdd}>
      {button}
    </button>
  );
}