import React, { useState } from "react";
import "./style.css";
import axios from "axios";

const DeleteModel = ({
  setDeletingModel,
  setProductList,
  itemId,
  setItemId,
}) => {
  const [isDeleting, setDeleting] = useState(false);
  const handleDelete = async (event) => {
    event.preventDefault();

    try {
      setDeleting(true);
      const url = `https://solarladder.onrender.com/api/product/${itemId}`;
      await axios.delete(url);

      setTimeout(async () => {
        setItemId("");
        try {
          setDeleting(false);
          setDeletingModel(false);
          setItemId("");
          const response = await axios.get(
            "https://solarladder.onrender.com/api/products"
          );
          setProductList(response.data);
        } catch (error) {
          console.log(error);
        }
      }, 2000);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="delteModelContainer">
      <p>Are you sure to delete this Itme</p>
      {!isDeleting && (
        <div className="deleteModelBtn">
          <p
            className="deleteModelBtnSure"
            onClick={(event) => handleDelete(event)}
          >
            Sure Delete
          </p>
          <p
            className="deleteModelBtnCancel"
            onClick={() => setDeletingModel(false)}
          >
            Cancel
          </p>
        </div>
      )}
      {isDeleting && <p className="isDeleting">Item is Deleting...</p>}
    </div>
  );
};

export default DeleteModel;
