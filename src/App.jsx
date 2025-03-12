import './bootstrap.min.css'
import './App.css'
import { Routes,Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Auth from './pages/Auth'
import Projects from './pages/Projects'
import Dashboard from './pages/Dashboard'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify'
import { useContext } from 'react'
import { authContext } from './context/ContextApi'

function App() {

  const {auth}=useContext(authContext)

  return (
    <>
      <Routes>
        <Route path='/' element={<Landing/>}></Route>
        <Route path='/auth' element={<Auth/>}></Route>
        <Route path='/projects' element={auth ?<Projects/>:<Auth/>}></Route>
        <Route path='/dash' element={auth ?<Dashboard/>:<Auth/>}></Route>
      </Routes>
      <Footer/>
      <ToastContainer/>
    </>
  )
}

export default App
