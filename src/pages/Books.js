import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import axios from 'axios';
import './style.css'
import ItemActionBtn from '../components/ItemActionBtn';
import ActionBar from '../components/ActionBar';
import Loder from '../components/Loder/Loder';
import AddItem from '../components/Model/AddItem';
import EditItem from '../components/Model/EditItem';
import DeleteModel from '../components/Model/DeleteModel';
import AdujstStockModel from '../components/Model/AdujstStockModel';
import AdjustStockBtn from '../components/AdjustStockBtn';
import DeleteMultiple from '../components/Model/DeleteMultiple';

const Books = () => {
    const [ProductList, setProductList] = useState([]);
    const [lowStockItem, setLowStockItem] = useState([]);
    const [loaderState, setLoaderState] = useState(true);
    const [showAIModel, setAIShowModel] = useState(false);
    const [showEditModel, setEditShowModel] = useState(false);
    const [showFilterItem, setShowFilterItem] = useState(false)
    const [allProduct, setAllProduct] = useState([])
    const [deletingModel, setDeletingModel] = useState(false)
    const [editId, setEditId] = useState("");
    const [adjuststockModel, setAdjustStockModel] = useState(false)
    const [selectedItemRows, setSelectedItemRows] = useState([])
    const [multiDeleteModel, setMultiDeleteModel] = useState(false)
    const [adjustData, setAdjustData] = useState({
        itemName: '',
        itemCode: '',
        currentStock: ''
    })

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

    const handleselectedRow = (selectedRows) => {
        // console.log(selectedRows.selectedRows)
        setSelectedItemRows(selectedRows.selectedRows)
        // console.log(selectedItemRows)
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
            selector: (row) => 0
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
                const isLowStock = Number(row.stockQuantity) < Number(row.lowStock)
                const id = row._id
                // setEditId(id)
                return (<ItemActionBtn
                    setEditId={setEditId}
                    itemId={id}
                    showLowStock={isLowStock}
                    model={showEditModel}
                    setModel={setEditShowModel}
                    setProductList={setProductList}
                    setDeletingModel={setDeletingModel}
                    stockQuantity={row.stockQuantity}
                />)
            }
        },
        {
            name: '',
            cell: (row) => {
                return (
                    <AdjustStockBtn
                        setAdjustStockModel={setAdjustStockModel}
                        setEditId={setEditId}
                        itemId={row._id}
                        itemName={row.itemName}
                        itemCode={row.itemCode}
                        adjustData={adjustData}
                        setAdjustData={setAdjustData}
                        stockQuantity={row.stockQuantity}
                    />
                )
            }
        },

    ]

    useEffect(() => {
        getProduct();
    }, [])



    return (
        <div>
            <ActionBar
                model={showAIModel}
                setModel={setAIShowModel}
                setShowFilterItem={setShowFilterItem}
                setProductList={setProductList}
                ProductList={ProductList}
                allProduct={allProduct}
                setLoaderState={setLoaderState}
                selectedItemRows={selectedItemRows}
                setMultiDeleteModel={setMultiDeleteModel}
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
                    onSelectedRowsChange={(seletedRows) => handleselectedRow(seletedRows)}
                    selectableRowsHighlight
                    highlightOnHover
                    dense
                    pointerOnHover
                />}
            </div>
            {/* //model */}
            {showAIModel && <AddItem model={showAIModel} setModel={setAIShowModel} setProductList={setProductList} />}

            {showEditModel && <EditItem model={showEditModel} setModel={setEditShowModel} setProductList={setProductList} itemId={editId} setItemId={setEditId} />}

            {deletingModel && <DeleteModel setDeletingModel={setDeletingModel} itemId={editId} setItemId={setEditId} setProductList={setProductList} />}

            {adjuststockModel &&
                <AdujstStockModel
                    setAdjustStockModel={setAdjustStockModel}
                    itemId={editId}
                    editId={editId}
                    setEditId={setEditId}
                    setProductList={setProductList}
                    adjustData={adjustData}
                />}

            {multiDeleteModel && <DeleteMultiple
                selectedItemRows={selectedItemRows}
                setMultiDeleteModel={setMultiDeleteModel}
                setProductList={setProductList}
                setSelectedItemRows={setSelectedItemRows}
            />}
        </div>
    )
}

export default Books 