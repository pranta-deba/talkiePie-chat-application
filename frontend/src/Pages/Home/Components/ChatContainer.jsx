import React from 'react';
import { useAuth } from '../../../Contexts/AuthContext';
import userConversation from '../../../Zustands/userConversation';

const ChatContainer = ({ handelShowSidebar }) => {
    const { user } = useAuth()
    const { messages, selectedConversation, setSelectedConversation } = userConversation();

    console.log(selectedConversation)


    return (
        <div className='min-h-screen w-full border-2 p-2'>
            {
                selectedConversation === null ? (<>
                    <div>
                        <h1>Select a conversation to start chatting</h1>
                        <p>hey : {user?.username}</p>
                    </div>
                </>) : (<>
                    <div>
                        <div className='flex justify-between gap-1 bg-sky-600 md:px-2 rounded-lg h-10 md:h-12'>
                            <div className='flex gap-2 md:justify-between items-center w-full'>
                                <div className='md:hidden ml-1 self-center'>
                                    <button onClick={() => handelShowSidebar()} className=' rounded-full px-2 py-1
                   self-center btn'>
                                        back
                                    </button>
                                </div>
                                <div className='flex justify-between mr-2 gap-2'>
                                    <div className='self-center'>
                                        <img className='rounded-full w-6 h-6 md:w-10 md:h-10 cursor-pointer' src={selectedConversation?.profileImage} />
                                    </div>
                                    <span className='text-gray-950 self-center text-sm md:text-xl font-bold'>
                                        {selectedConversation?.username}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </>)
            }
        </div>
    );
};

export default ChatContainer;