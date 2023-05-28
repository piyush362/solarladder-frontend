import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import axios from 'axios';
import './style.css'
import ItemActionBtn from '../components/ItemActionBtn';
import ActionBar from '../components/ActionBar';
import Loder from '../components/Loder/Loder';
import AddItem from '../components/Model/AddItem';
import EditItem from '../components/Model/EditItem';

const Books = () => {
    const [ProductList, setProductList] = useState([]);
    const [lowStockItem, setLowStockItem] = useState([]);
    const [loaderState, setLoaderState] = useState(true);
    const [showAIModel, setAIShowModel] = useState(false);
    const [showEditModel, setEditShowModel] = useState(false);
    const [showFilterItem, setShowFilterItem] = useState(false)
    const [allProduct, setAllProduct] = useState([])
    const [editId, setEditId] = useState("");

    const getLowStockItem = () => {
        const filterData = ProductList.filter((item) => item.stockQuantity < item.lowStock);
        setLowStockItem(filterData);
        console.log(lowStockItem)
    }
    if (showFilterItem) {
        getLowStockItem();
    }
    // { showFilterItem && getLowStockItem() }

    const getProduct = async () => {
        try {
            const response = await axios.get("https://solarladder.onrender.com/api/products")
            setProductList(response.data)
            setAllProduct(response.data)
            setLoaderState(false)
        } catch (error) {
            console.log(error)
        }
    }

    const coloums = [
        {
            name: "Item Name",
            selector: (row) => row.itemName
        },
        {
            name: "Item Code",
            selector: (row) => row.itemCode
        },
        {
            name: "Category",
            selector: (row) => row.categeory
        },
        {
            name: "Stock Quantity",
            selector: (row) => row.stockQuantity,
            sortable: true
        },
        {
            name: "Stock on Hold",
            selector: (row) => row.stockOnHold
        },
        {
            name: "Stock Value",
            selector: (row) => `₹${Number(row.purchaseValue) * Number(row.stockQuantity)}`
        },
        {
            name: "Purchase Price",
            selector: (row) => `₹${row.purchaseValue}`
        },
        {
            name: '',
            cell: (row) => {
                const isLowStock = row.stockQuantity < row.lowStock
                const id = row._id
                // setEditId(id)
                return (<ItemActionBtn
                    setEditId={setEditId}
                    itemId={id}
                    showLowStock={isLowStock}
                    model={showEditModel}
                    setModel={setEditShowModel}
                    setProductList={setProductList}
                />)
            }
        },
        {
            name: '',
            cell: () => <p className='adjustStockBtn'>ADJUST STOCK</p>
        },

    ]

    useEffect(() => {
        getProduct();
    }, [])



    return (
        <div>
            <ActionBar model={showAIModel} setModel={setAIShowModel} setShowFilterItem={setShowFilterItem} setProductList={setProductList} ProductList={ProductList}
                allProduct={allProduct}
            />
            <div className='bookContainer'>
                {loaderState && <Loder />}
                {!loaderState && <DataTable
                    columns={coloums}
                    data={ProductList}
                    title={'Inventery'}
                    pagination
                    fixedHeader
                    fixedHeaderScrollHeight='380px'
                    selectableRows
                    selectableRowsHighlight
                    highlightOnHover
                    dense
                    pointerOnHover
                />}
            </div>
            {showAIModel && <AddItem model={showAIModel} setModel={setAIShowModel} setProductList={setProductList} />}
            {showEditModel && <EditItem model={showEditModel} setModel={setEditShowModel} setProductList={setProductList} itemId={editId} setItemId={setEditId} />}
        </div>
    )
}

export default Books 