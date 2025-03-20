import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from './Contexts/AuthContext.jsx'
import { SocketContextProvider } from './Contexts/SocketContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthContextProvider>
      <SocketContextProvider>
        <StrictMode>
          <App />
        </StrictMode>
      </SocketContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
)
