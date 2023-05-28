import React from 'react'
import './style.css'

const AdjustStockBtn = ({ itemId, setAdjustStockModel, setEditId, itemName, itemCode, setAdjustData, stockQuantity }) => {
    return (
        <p className='adjustStockBtn'
            onClick={() => {
                setAdjustStockModel(true);
                setEditId(itemId);
                setAdjustData((prev) => ({
                    ...prev,
                    itemName: itemName,
                    itemCode: itemCode,
                    currentStock: stockQuantity
                }));
            }}
        >ADJUST STOCK</p>
    )
}

export default AdjustStockBtn