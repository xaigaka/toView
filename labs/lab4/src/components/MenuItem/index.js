import React from "react";

export default function MenuItem({ itemId, itemName, itemPrice, itemDescription }) {
  const menuID = `menu-item-${itemId}`;

  return (
    <div className="menu-item" id={menuID}>
      <span>${itemPrice}</span>
      <h2>{itemName}</h2>
      <p>{itemDescription}</p>
      <button style={styles.button}>Add to Cart</button>
      <br></br><br></br>
    </div>
  );
}

const styles = {
  button: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
  },
};
