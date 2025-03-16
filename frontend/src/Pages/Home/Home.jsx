import React from 'react';
import SideBar from './Components/SideBar';
import ChatContainer from './Components/ChatContainer';

const Home = () => {
    return (
        <div className='min-h-screen flex justify-center items-center gap-2 p-2'>
            {/* side bar */}
            <div><SideBar /></div>
            {/* message container */}
            <div><ChatContainer /></div>
        </div>
    );
};

export default Home;