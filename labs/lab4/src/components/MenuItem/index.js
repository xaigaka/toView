import React from "react"

export default function MenuItem({ itemId, itemName, itemPrice, itemDescription }) {
  const menuID = `menu-item-${itemId}`;

  return (
    <div className="menu-item" id={menuID}>
      <span>${itemPrice}</span>
      <h2>{itemName}</h2>
      <p>{itemDescription}</p>
      <button>Add to Cart</button>
    </div>
  );
}