import { useState } from "react";
import { createContext, useContext } from "react";
import { getDataFromLocalStorage } from "../utils/localStorage";


export const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(getDataFromLocalStorage() || null);
    
    return <AuthContext.Provider value={{ user, setUser }}>
        {children}
    </AuthContext.Provider>

}
