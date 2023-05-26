import React from 'react'
import { Link } from 'react-router-dom'
import './style.css'

const Dashboard = () => {
    return (
        <div>
            <h1>dashboard</h1>
            <Link to='/'>Go to Home</Link>
        </div>
    )
}

export default Dashboard