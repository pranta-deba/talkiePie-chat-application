import React, { useState } from 'react';
import SideBar from './Components/SideBar';
import ChatContainer from './Components/ChatContainer';

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
        <div className='min-h-screen w-full flex justify-center items-center gap-2 p-2'>
            {/* side bar */}
            <div className={isSidebarVisible ? "" : 'hidden'}>
                <SideBar handelUserSelect={handelUserSelect} />
            </div>
            {/* message container */}
            <div className={`${isSidebarVisible ? "" : 'hidden'} ${selectedUser ? "block" : 'hidden'}`}>
                <ChatContainer handelShowSidebar={handelShowSidebar} />
            </div>
        </div>
    );
};

export default Home;