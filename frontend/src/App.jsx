import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Starter from './pages/Starter/Starter.jsx'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import Chat from './pages/Chat/Chat'

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' element={<Starter />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/login' element={<Login />} />
          <Route path='/chat' element={<Chat />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
