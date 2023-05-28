import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
// import Dashboard from './pages/Dashboard'
// import NoMatch from './pages/NoMatch'
import Books from './pages/Books'

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/books' element={<Books />} />
        {/* <Route path='*' element={<NoMatch />} /> */}
      </Routes>
    </Router>
  )
}

export default App
