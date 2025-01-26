import React, { useState, useEffect } from "react";
import "./ItemForm.css";

const ItemForm = ({ onAddItem, itemToEdit, closeForm }) => {
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("clothing");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    if (itemToEdit) {
      setItemName(itemToEdit.itemName);
      setPrice(itemToEdit.price);
      setCategory(itemToEdit.category);
      setQuantity(itemToEdit.quantity);
    }
  }, [itemToEdit]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!itemName || !price || !quantity) {
      alert("Please fill in the details");
      return;
    }

    const newitem = {
      itemName,
      price: Number(price),
      category,
      quantity: Number(quantity),
    };
    onAddItem(newitem);
    setItemName("");
    setPrice("");
    setCategory("Clothing");
    setQuantity("");
  }
  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
        <label>Item name</label>
        <input
          className="input"
          type="text"
          placeholder="Item name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        ></input>
        <label>Price</label>

        <input
          className="input"
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        ></input>

        <label>Category</label>
        <select
          className="input"
          placeholder="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Clothing">Clothing</option>
          <option value="Electronics">Electronics</option>
          <option value="Books">Books</option>
          <option value="Groceries">Groceries</option>
        </select>
        <label>Quantity</label>
        <input
          className="input"
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        ></input>
        <div className="btn-group">
          <button className="btn-cancel" onClick={closeForm}>
            Cancel
          </button>
          <button className="btn" type="submit">
            {itemToEdit ? "Update Item" : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ItemForm;
