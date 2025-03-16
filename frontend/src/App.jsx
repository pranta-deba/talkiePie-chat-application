import { Route, Routes } from "react-router-dom";
import './App.css'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={"home"} />
        <Route path="/login" element={"register"} />
        <Route path="/register" element={"register"} />
      </Routes>
    </>
  )
}

export default App
