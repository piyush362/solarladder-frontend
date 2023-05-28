import React, { useState } from "react";
import "./style.css";
import axios from "axios";

const AddItem = ({ model, setModel, setProductList }) => {
  const [isUploading, setUploading] = useState(false);
  const [isScuccess, setSuccess] = useState(false);
  const [uploadStatus, setUplaodStatus] = useState(false);
  const [itemData, setItemData] = useState({
    itemName: "",
    itemCode: "",
    itemDescription: "",
    categeory: "",
    stockQuantity: "",
    lowStock: "",
    purchaseValue: "",
    image: null,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create a new FormData instance
    const formData = new FormData();

    // Append the form data
    formData.append("itemName", itemData.itemName);
    formData.append("itemCode", itemData.itemCode);
    formData.append("itemDescription", itemData.itemDescription);
    formData.append("categeory", itemData.categeory);
    formData.append("stockQuantity", itemData.stockQuantity);
    formData.append("lowStock", itemData.lowStock);
    formData.append("purchaseValue", itemData.purchaseValue);
    formData.append("image", itemData.image);

    // const tempDate = {
    //   itemName: "test 99",
    //   itemCode: "001",
    //   itemDescription: "desc",
    //   stockQuantity: "200",
    //   lowStock: "10",
    //   purchaseValue: "200",
    //   categeory: "panel",
    // };

    try {
      // Send the form data using Axios
      setUplaodStatus(true);
      setUploading(true);
      const response = await axios.post(
        "https://solarladder.onrender.com/api/product",
        formData
      );
      setUploading(false);
      setSuccess(true);

      // Handle the response as needed
      console.log(response.data);
      // console.log(itemData);

      // Reset the form data
      setItemData({
        itemName: "",
        itemCode: "",
        itemDescription: "",
        stockQuantity: "",
        lowStock: "",
        purchaseValue: "",
        image: null,
      });

      // Close the modal or perform any other necessary actions
      // alert("success");
      setTimeout(async () => {
        setSuccess(false);
        setUplaodStatus(false);
        setModel(!model);

        try {
          const response = await axios.get(
            "https://solarladder.onrender.com/api/products"
          );
          setProductList(response.data);
        } catch (error) {
          console.log(error);
        }
      }, 2000);
      // setModel(!model);
      // console.log(itemData.itemName);
    } catch (error) {
      // Handle errors
      console.error(error);
    }
  };

  const handleInputChange = (event) => {
    if (event.target.type === "file") {
      setItemData({
        ...itemData,
        image: event.target.files[0],
      });
    } else {
      setItemData({
        ...itemData,
        [event.target.name]: event.target.value,
      });
    }
  };

  return (
    <>
      <div
        className="modelBackground"
        onClick={(event) => setModel(!model)}
      ></div>
      <div className="modelContainer">
        <div className="addItemContainer">
          <div className="aiTop">
            <p>CREATE ITEM</p>
            <p className="crossBtn" onClick={(event) => setModel(!model)}>
              X
            </p>
          </div>
          <div className="aiContent">
            <div className="generalDetails">
              <p className="HeadingAi">General Details</p>
              <label for="image">Image</label>
              <input type="file" name="image" onChange={handleInputChange} />
              <label for="itemName">Item Name</label>
              <input
                type="text"
                name="itemName"
                placeholder="Item Name"
                value={itemData.itemName}
                onChange={handleInputChange}
              />
              <label for="itemCode">Item Code</label>
              <input
                type="text"
                name="itemCode"
                placeholder="Item Code"
                value={itemData.itemCode}
                onChange={handleInputChange}
              />
              <label for="itemDescription">Item Description</label>
              <input
                type="text"
                name="itemDescription"
                placeholder="Item Description"
                value={itemData.itemDescription}
                onChange={handleInputChange}
              />
              <label for="categeory">Categeory</label>
              <select
                id="categeory"
                name="categeory"
                value={itemData.categeory}
                onChange={handleInputChange}
              >
                <option value="">Select Categeory</option>
                <option value="Panel">Panel</option>
                <option value="PVC Material">PVC Material</option>
                <option value="Invertor">Invertor</option>
              </select>
            </div>
            <div className="stockDetails">
              <p className="HeadingAi">Stock Details</p>
              <label for="stockQuantity">Stock Quantity {"(PCS)"}</label>
              <input
                type="text"
                name="stockQuantity"
                placeholder="Stock Quantity"
                value={itemData.stockQuantity}
                onChange={handleInputChange}
              />
              <label for="lowStock">Low Stock {"(PCS)"}</label>
              <input
                type="text"
                name="lowStock"
                placeholder="Low Stock"
                value={itemData.lowStock}
                onChange={handleInputChange}
              />
              <label for="purchaseValue">Purchase Value {"(₹)"}</label>
              <input
                type="text"
                name="purchaseValue"
                placeholder="Purchase Value"
                value={itemData.purchaseValue}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="aiActionBtn">
            <p className="savebtn" onClick={(event) => handleSubmit(event)}>
              ADD ITEM
            </p>
            <p onClick={() => setModel(!model)}>CANCEL</p>
          </div>
        </div>
      </div>
      {uploadStatus && (
        <div className="uploadinContainer">
          {isUploading && <p className="isUplaoding">Item is Uploading...</p>}
          {isScuccess && (
            <p className="isUplaoding">Item Uploading Success ✅</p>
          )}
        </div>
      )}
    </>
  );
};

export default AddItem;
