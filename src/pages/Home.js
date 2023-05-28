import React from 'react'
import { Link } from 'react-router-dom'
import './style.css'

const Home = () => {
    return (
        <div className='homeContainer1'>
            <h1>Solar Ladder</h1>
            <h1>Please open Books tab</h1>
            <Link to='/books'>Click here to Books tab or explore via tab routing</Link>
        </div>
    )
}

export default Home