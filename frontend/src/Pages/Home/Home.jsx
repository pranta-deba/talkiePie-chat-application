import React, { useState } from 'react';
import SideBar from './Components/SideBar';
import ChatContainer from './Components/ChatContainer';
import SIdeNav from './Components/SIdeNav';

const Home = () => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);


    const handelUserSelect = (user) => {
        setSelectedUser(user);
        setIsSidebarVisible(false);
    }
    const handelShowSidebar = () => {
        setIsSidebarVisible(true);
        setSelectedUser(null);
    }

    return (
        <div className='flex h-screen bg-gray-50'>
            {/* side nav */}
            <SIdeNav />

            {/* side bar */}
            <div className={`w-80 bg-white border-r md:flex md:flex-col ${isSidebarVisible ? '' : 'hidden'}`}>
                <SideBar handelUserSelect={handelUserSelect} />
            </div>

            {/* message container */}
            <div className={`flex-auto ${selectedUser ? '' : 'hidden md:flex'} bg-gray-200}`}>
                <ChatContainer handelShowSidebar={handelShowSidebar} />
            </div>
        </div>
    );
};

export default Home;