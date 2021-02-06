import React from 'react';

export default function ItemData(props) {
  return (
    <table className="table">
      <thead>
        <tr>
          <td className="text-right">Brand</td>
          <td className="text-right">Price</td>
          <td className="text-right">Location</td>
          <td className="text-right">Price Type</td>
          <td className="text-right">Servings</td>
        </tr>
      </thead>
      <tbody>
        {
          props.items.map((item) => {
            return <tr key={item.id}>
              <td className="text-left">{item.brand}</td>
              <td className="text-left">{item.price}</td>
              <td className="text-left">{item.location}</td>
              <td className="text-left">{item.priceType}</td>
              <td className="text-left">{item.servings}</td>
            </tr>
          })
        }

        </tbody>
    </table>
  );
}

// <div className="table-responsive">
//   <table className="table">
//     <StoreHeader/>
//       {
//         props.items.sort(compare).map((item) =>
//           <StoreItem
//             key={item.id}
//             id={item.id}
//             item={item.item}
//             price={item.price}
//             priceType={item.priceType}
//             brand={item.brand}
//             location={item.location}
//             servings={item.servings}
//             onList={item.onList}
//             onAdd={() => props.onAdd(item)}
//             onDelete={() => props.onDelete(item)}
//             onEdit={() => props.onEdit(item)}
//           />
//         )
//       }
//   </table>
// </div>