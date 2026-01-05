
import './index.css'
import Header from './components/header'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import About from './Pages/About'

function App() {

  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>

        </Routes>
    </BrowserRouter>
  )
}

export default App
