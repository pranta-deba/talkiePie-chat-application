import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../Contexts/AuthContext';
import userConversation from '../../../Zustands/userConversation';
import axios from 'axios';

const ChatContainer = ({ handelShowSidebar }) => {
    const { user } = useAuth()
    const { messages, selectedConversation, setMessage, setSelectedConversation } = userConversation();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getMessages = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get(`/api/message/${selectedConversation._id}`);
                console.log(data)
                setMessage(data.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }

        if (selectedConversation?._id) getMessages();
    }, [selectedConversation?._id, setMessage]);

    console.log(messages)


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
                        <div className='p-3 overflow-auto'>

                            {loading && (
                                <div className="flex w-full h-full flex-col items-center justify-center 
                gap-4 bg-transparent">
                                    <div className="loading loading-spinner"></div>
                                </div>
                            )}

                            {!loading && messages?.length === 0 && (
                                <p className='text-center text-white items-center'>Send a message to
                                    start Conversation</p>
                            )}

                            {
                                !loading && messages?.length > 0 && messages?.map((message) => (
                                    <div className='text-white' key={message?._id}>
                                        <div className={`chat ${message.senderId === user._id ? 'chat-end' : 'chat-start'}`}>
                                            <div className='chat-image avatar'></div>
                                            <div className={`chat-bubble ${message.senderId === user._id ? 'bg-sky-600' : ''

                                                }`}>
                                                {message?.message}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }

                        </div>
                    </div>
                </>)
            }
        </div>
    );
};

export default ChatContainer;