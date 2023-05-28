import React, { useState } from 'react'
import './style.css'
import axios from 'axios'

const ActionBar = ({ model, setModel, setShowFilterItem, setProductList, ProductList, allProduct, setLoaderState }) => {

    const [isLow, setIsLow] = useState(false)
    // const [allProduct] = useState(ProductList);
    // const [lowBtn, setLowBtn] = useState('lowbtn')


    const getLowStockItem = () => {
        const filterData = ProductList.filter((item) => Number(item.stockQuantity) < Number(item.lowStock));
        setProductList(filterData);
        setIsLow(true)
    }
    // const getProduct = async () => {
    //     try {
    //         const response = await axios.get("https://solarladder.onrender.com/api/products")
    //         setProductList(response.data)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    const setEveryProduct = async () => {
        try {
            setIsLow(!isLow)
            setLoaderState(true)
            const response = await axios.get("https://solarladder.onrender.com/api/products")
            setProductList(response.data)
            setLoaderState(false)
        } catch (error) {
            console.log(error)
        }
        // setProductList(allProduct)
    }

    const handleClick = () => {
        if (!isLow) {
            getLowStockItem()
        } else if (isLow) {
            setEveryProduct()
        }
    }

    return (
        <div className='actionBarContainer'>
            {!isLow && <p className="lowstockBtn"
                onClick={() => handleClick()}
            >SHOW LOW STOCK</p>}
            {isLow && <p className="lowstockBtnCross"
                onClick={() => handleClick()}
            >SHOW ALL STOCK </p>}
            <p className='delBtn'>- DELETE SELECTED</p>
            <p className='atiBtn' onClick={() => setModel(!model)}>+ ADD TO INVENTORY</p>
        </div>
    )
}

export default ActionBar