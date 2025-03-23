import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import AuthVerifiedRoute from "./Routes/AuthVerifiedRoute";
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';


function App() {

  return (
    <>
      <HelmetProvider>
        <Routes>
          <Route element={<AuthVerifiedRoute />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Toaster
          position="top-right"
          reverseOrder={false}
        />
      </HelmetProvider>
    </>
  )
}

export default App
