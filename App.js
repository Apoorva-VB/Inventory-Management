import React, { useState } from "react";
import InventoryTable from "./InventoryTable";
import ItemForm from "./ItemForm";
import Modal from "./Modal";
import "./main.css";
const App = () => {
  const [inventory, setInventory] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  function addItemtoInventory(newitem) {
    if (editingIndex !== null) {
      const updatedInventory = [...inventory];
      updatedInventory[editingIndex] = newitem;
      setInventory(updatedInventory);
      setEditingIndex(null);
    } else {
      setInventory([newitem, ...inventory]);
    }
    setIsFormVisible(false);
  }
  const handleEdit = (index) => {
    setEditingIndex(index);
    setIsFormVisible(true);
  };

  function handleDelete(index) {
    if (window.confirm("Are you sure you want to delete this item?")) {
      setInventory((prev) => prev.filter((item, i) => i !== index));
    }
  }

  const closeForm = () => {
    setIsFormVisible(false);
  };
  return (
    <div>
      <div className="header-container">
        <img
          className="header-container"
          src="/b66095ad-aeb6-4b4f-bac2-7f6f6e41fb4d.jpg"
          alt="logo"
          style={{ height: "100px" }}
        />
        <h1 className="head">Inventory Management System</h1>
      </div>
      {isFormVisible && (
        <Modal onClose={closeForm}>
          <ItemForm
            onAddItem={addItemtoInventory}
            itemToEdit={editingIndex !== null ? inventory[editingIndex] : null}
            closeForm={closeForm}
          />
        </Modal>
      )}

      <InventoryTable
        inventory={inventory}
        onDelete={handleDelete}
        onEdit={handleEdit}
        setIsFormVisible={setIsFormVisible}
      />
    </div>
  );
};

export default App;
