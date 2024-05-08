import { useState } from 'react'
import SideNav from './components/SideNav'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Login />
      <ToastContainer />
    </>
  )
}

export default App
