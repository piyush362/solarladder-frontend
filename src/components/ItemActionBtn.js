import React, { useState } from 'react'
import './style.css'

const ItemActionBtn = ({ itemId, showLowStock, model, setModel, setProductList, setEditId }) => {
    // console.log(showLowStock);

    return (
        <>
            <div className='ItemActionBtnContainer'>
                {showLowStock && <img
                    title="Low stock"
                    src="https://www.freeiconspng.com/thumbs/alert-icon/alert-icon-red-11.png"
                    alt=""
                    className='alert-logo'
                />}
                {!showLowStock && <div className='alert-logo-plane'></div>
                }

                <img
                    onClick={() => {
                        setEditId(itemId)
                        setModel(true)
                    }}
                    src="https://cdn.icon-icons.com/icons2/685/PNG/512/edit_icon-icons.com_61193.png"
                    alt="L.S"
                    className='edit-logo'
                />
            </div>
        </>
    )
}

export default ItemActionBtn