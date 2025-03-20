import { createContext, useContext, useState } from 'react';
import io from 'socket.io-client';
import { useAuth } from './AuthContext';

export const SocketContext = createContext();

export const useSocket = () => {
    return useContext(SocketContext);
}

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUser, setOnlineUser] = useState([]);
    const { user } = useAuth();
}