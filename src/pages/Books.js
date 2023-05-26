import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
// import allproduct from '../data.js'
import axios from 'axios';

const Books = () => {
    const [pending, setPending] = React.useState(false);
    const [ProductList, setProductList] = useState([]);

    const getProduct = async () => {
        try {
            const response = await axios.get("https://solarladder.onrender.com/api/products")
            setProductList(response.data)
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
            selector: (row) => row.stockHold
        },
        {
            name: "Stock Value",
            selector: (row) => row.stockHold
        },
        {
            name: "Purchase Price",
            selector: (row) => row.stockHold
        },
        {
            name: '',
            cell: () => <p>/</p>
        },
        {
            name: '',
            cell: () => <button style={{ fontSize: 10, padding: 5, color: 'blue' }}>ADJUST STOCK</button>
        },

    ]

    useEffect(() => {
        getProduct();
    }, [])



    return (
        <div
            style={{
                padding: 10,
                borderWidth: 1,
                borderColor: 'gray'
            }}
        >
            <DataTable
                columns={coloums}
                data={ProductList}
                pagination
                title={'Books'}
                fixedHeader
                fixedHeaderScrollHeight='380px'
                selectableRows
                selectableRowsHighlight
                highlightOnHover
                actions={
                    <button>export</button>
                }
                subHeader
                pointerOnHover
                progressPending={pending}
            />
        </div>
    )
}

export default Books 