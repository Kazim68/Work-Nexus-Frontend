import './App.css'
import AppRoutes from './Routes/AppRoutes'

import Navbar from "./Components/LandingPages/Navbar";


import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // import styles


function App() {
  return (
    <>
      <AppRoutes />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  )
}

export default App
