import React, { useState } from 'react';
import SideBar from './Components/SideBar';
import ChatContainer from './Components/ChatContainer';
import SIdeNav from './Components/SIdeNav';
import toast from 'react-hot-toast';
import { useAuth } from '../../Contexts/AuthContext';
import { removeDataFromLocalStorage } from '../../utils/localStorage';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {

    const [selectedUser, setSelectedUser] = useState(null);
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const { user, setUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [menu, setMenu] = useState(false);
    const navigate = useNavigate()


    const handelUserSelect = (user) => {
        setSelectedUser(user);
        setIsSidebarVisible(false);
    }
    const handelShowSidebar = () => {
        setIsSidebarVisible(true);
        setSelectedUser(null);
    }

    // logout
    const handelLogOut = async () => {
        const confirmLogout = window.prompt("type 'UserName' To LOGOUT");
        if (confirmLogout === user.username) {
            setLoading(true);
            try {
                const { data } = await axios.post('/api/auth/logout');
                if (data.success) {
                    toast.success(data.message);
                    removeDataFromLocalStorage();
                    setUser(null);
                    setLoading(false);
                    navigate("/login");
                } else {
                    toast.error(data.message || "something went wrong!aaaaa");
                    setLoading(false);
                }
            } catch (error) {
                setLoading(false);
                toast.error(error?.response?.data?.message || "something went wrong!");
            }
        } else {
            toast.error("invalid username!")
        }
    }

    return (
        <div className='flex h-screen bg-gray-50'>
            {/* side nav */}
            <SIdeNav handelLogOut={handelLogOut} />

            {/* side bar */}
            <div className={`w-full md:w-80 bg-white md:border-r md:flex md:flex-col ${isSidebarVisible ? '' : 'hidden'}`}>
                <SideBar handelUserSelect={handelUserSelect} />
            </div>

            {/* chat area */}
            <div className={`flex-1 bg-gray-50 ${selectedUser ? '' : 'hidden md:flex flex-col'}`}>
                <ChatContainer handelShowSidebar={handelShowSidebar} />
            </div>
        </div>
    );
};

export default Home;