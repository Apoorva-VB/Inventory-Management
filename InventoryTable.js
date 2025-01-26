import React, { useState } from "react";
import "./InventoryTable.css";

const InventoryTable = ({ inventory, onDelete, onEdit, setIsFormVisible }) => {
  const [filteredcategory, setFilteredCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("");

  const filteredInventory =
    filteredcategory === "All"
      ? inventory
      : inventory.filter((items) => items.category === filteredcategory);

  //
  const sortQuantity =
    sortOrder === "Ascending"
      ? [...filteredInventory].sort((a, b) => a.quantity - b.quantity)
      : sortOrder === "Descending"
      ? [...filteredInventory].sort((a, b) => b.quantity - a.quantity)
      : filteredInventory;
  return (
    <div className="container">
      <div className="inventory-header">
        <h4>Inventory</h4>
        <div className="tin">
          <label style={{ marginRight: "5px", marginTop: "3px" }}>Sort</label>
          <select
            className="sort-dropdown"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value=""> Default </option>
            <option value="Ascending">Ascending</option>
            <option value="Descending">Descending</option>
          </select>
          <select
            className="filter-dropdown"
            value={filteredcategory}
            onChange={(e) => setFilteredCategory(e.target.value)}
          >
            <option value="All">Category</option>
            <option value="Clothing">Clothing</option>
            <option value="Electronics">Electronics</option>
            <option value="Books">Books</option>
            <option value="Groceries">Groceries</option>
          </select>
        </div>
        <button className=" add-button" onClick={() => setIsFormVisible(true)}>
          Add Item
        </button>
      </div>

      <table className="inventory-table">
        <thead>
          <tr>
            <th>Item name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortQuantity.length > 0
            ? sortQuantity.map((item, index) => (
                <tr
                  key={index}
                  className={item.quantity < 10 ? "low-quantity" : ""}
                >
                  <td>{item.itemName}</td>

                  <td>{item.price}</td>
                  <td>{item.category}</td>
                  <td>{item.quantity}</td>
                  <td className="actions">
                    <button
                      className="actions-edit"
                      style={{ cursor: "pointer" }}
                      onClick={() => onEdit(index)}
                    >
                      Edit
                    </button>
                    <button
                      className="actions-cancel"
                      style={{ cursor: "pointer" }}
                      onClick={() => onDelete(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            : filteredcategory !== "All" && (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center", color: "red" }}>
                    No items found for this category
                  </td>
                </tr>
              )}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryTable;
