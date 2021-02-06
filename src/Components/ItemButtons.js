import React from 'react';
import {Link} from 'react-router-dom';

export default function ItemButtons(props) {
  return (
    <table className="table">
      <thead>
        <tr>
          <td className="text-right"></td>
          <td className="text-right"></td>
        </tr>
      </thead>
      <tbody>
        {
          props.items.map((item) => {
            return <tr key={item.id}>
              <td className="text-left">
                <Link to={'/Edit/' + props.id}>
                  <button type="button" className="btn btn-primary">
                    Edit
                  </button>
                </Link>
              </td>
              <td className="text-left">
                <button className="btn btn-danger" onClick={props.onDelete}>
                  Del
                </button>
              </td>
            </tr>;
          })
        }
      </tbody>
    </table>
  );
}