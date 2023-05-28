import React, { useState } from 'react'
import './deletemultiple.css'
import axios from 'axios';

const DeleteMultiple = ({ setMultiDeleteModel, selectedItemRows, setProductList, setSelectedItemRows }) => {
    const [isDeleting, setDeleting] = useState(false);

    const handleDelete = async (event) => {
        event.preventDefault();

        try {
            setDeleting(true);
            const allById = selectedItemRows.map(item => item._id)
            console.log(allById)

            for (var i = 0; i < allById.length; i++) {
                const url = `https://solarladder.onrender.com/api/product/${allById[i]}`
                await axios.delete(url);
            }
            // alert("item deleted")
            setDeleting(false)
            setMultiDeleteModel(false)

        } catch (error) {
            console.log(error.message);
            alert(error.message)
            setDeleting(false)
            setMultiDeleteModel(false)
            setSelectedItemRows([])
            selectedItemRows.length = 0
        }
        try {
            const response = await axios.get(
                "https://solarladder.onrender.com/api/products"
            );
            setSelectedItemRows([])
            setProductList(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="delteModelContainer">
            <p>Are you sure to delete Multiple Item</p>
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
                        onClick={() => setMultiDeleteModel(false)}
                    >
                        Cancel
                    </p>
                </div>
            )}
            {isDeleting && <p className="isDeleting">Item is Deleting...</p>}
        </div>
    )
}

export default DeleteMultiple