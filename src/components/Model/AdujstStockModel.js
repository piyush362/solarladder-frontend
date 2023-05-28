import React, { useState } from "react";
import "./style.css";
import axios from "axios";

const AdujstStockModel = ({
  setAdjustStockModel,
  editId,
  itemId,
  setEditId,
  setProductList,
  adjustData,
}) => {
  const [adjustmentType, setAdjustmentType] = useState("add");
  const [stockUpdating, setStockUpdating] = useState(false);
  const [stockData, setStockData] = useState({
    changeStock: "0",
  });

  const handleStockQuantityChange = (event) => {
    const { name, value } = event.target;
    setStockData((prevStockData) => ({
      ...prevStockData,
      [name]: value,
    }));
  };

  const updateStock = () => {
    if (adjustmentType === "add") {
      return Number(stockData.changeStock) + Number(adjustData.currentStock);
    } else if (adjustmentType === "reduce") {
      return (
        (Number(stockData.changeStock) - Number(adjustData.currentStock)) * -1
      );
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newStock = updateStock();
    console.log(newStock);

    try {
      setStockUpdating(true);
      const url = `https://solarladder.onrender.com/api/product/${itemId}`;
      await axios.put(url, {
        stockQuantity: newStock,
      });
      setStockUpdating(false);
      setAdjustStockModel(false);
    } catch (error) {
      console.log(error);
    }
    try {
      const response = await axios.get(
        "https://solarladder.onrender.com/api/products"
      );
      setProductList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="adjuststockContainer">
      <p className="adjustStockHeading">Adjust Stock Quantity</p>
      <div>
        {/* <p>
          <b>Item Id: </b>
          {editId}
        </p> */}
        {/* <p>
          <b>stock quantity: </b>
          {adjustData.currentStock}
        </p> */}
        <p>
          <b>Item Name: </b>
          {adjustData.itemName}
        </p>
        <p>
          <b>Item Code: </b>
          {adjustData.itemCode}
        </p>
        <p>Add or Reduce Stock</p>
        <label>
          <input
            type="radio"
            name="adjustmentType"
            value="add"
            checked={adjustmentType === "add"}
            onChange={() => setAdjustmentType("add")}
          />
          Add (+)
        </label>
        <label>
          <input
            type="radio"
            name="adjustmentType"
            value="reduce"
            checked={adjustmentType === "reduce"}
            onChange={() => setAdjustmentType("reduce")}
          />
          Reduce (-)
        </label>
      </div>
      <div className="adjustInput">
        <label htmlFor="adjustStock">Adjust Stock (PCS)</label>
        <input
          type="text"
          placeholder="Adjust Stock PCS"
          name="changeStock"
          value={stockData.changeStock}
          onChange={handleStockQuantityChange}
        />
      </div>
      <div className="adjustactionBtn">
        <p className="adjustSaveBtn" onClick={(event) => handleSubmit(event)}>
          Save
        </p>
        <p onClick={() => setAdjustStockModel(false)}>Cancel</p>
      </div>
      {stockUpdating && (
        <div className="stockupdatingContainer">
          <p>Stock updating....</p>
        </div>
      )}
    </div>
  );
};

export default AdujstStockModel;
