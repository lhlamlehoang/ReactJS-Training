import './App.css'
import Login from './pages/Login/Login.jsx';
import Home from './pages/Home/Home.jsx'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
      </Routes>
    </Router>
  )
}

export default App
