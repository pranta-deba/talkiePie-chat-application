import { Route, Routes } from "react-router-dom";
import './App.css'
import Home from "./Pages/Home/Home";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import { ToastContainer, Bounce } from 'react-toastify';
import AuthVerifiedRoute from "./Routes/AuthVerifiedRoute";
import  { Toaster } from 'react-hot-toast';

function App() {

  return (
    <>
      <Routes>
        <Route element={<AuthVerifiedRoute />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <Toaster
        position="top-left"
        reverseOrder={false}
      />
    </>
  )
}

export default App
