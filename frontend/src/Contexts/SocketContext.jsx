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

    useEffect(() => {
        if (user) {
            const socket = io('http://localhost:3000', {
                query: {
                    userId: user._id
                }
            })
            socket.on('getOnlineUsers', (users) => {
                setOnlineUser(users);
            })
            setSocket(socket);
            return () => socket.close();
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [user]);

    return (
        <SocketContext.Provider value={{ socket, onlineUser }}>
            {children}
        </SocketContext.Provider>
    )
}