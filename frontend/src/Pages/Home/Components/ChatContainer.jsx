import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../../Contexts/AuthContext';
import userConversation from '../../../Zustands/userConversation';
import axios from 'axios';

const ChatContainer = ({ handelShowSidebar }) => {
    const { user } = useAuth()
    const { messages, selectedConversation, setMessage, setSelectedConversation } = userConversation();
    const [loading, setLoading] = useState(false);
    const lastMessageRef = useRef();
    const [sending, setSending] = useState(false);
    const [sendData, setSendData] = useState("");

    useEffect(() => {
        setTimeout(() => {
            lastMessageRef?.current?.scrollIntoView({ behavior: "smooth" })
        }, 100)
    }, [messages])

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

    const handelMessages = (e) => {
        setSendData(e.target.value);
    }


    const handelSubmit = async (e) => {
        e.preventDefault();
        setSending(true);
        const message = sendData;
        try {
            const { data } = await axios.post(`/api/message/send/${selectedConversation._id}`, { message });
            console.log(data)
            setMessage([...messages, data?.data]);
            setSendData('');
            setSending(false);
        } catch (error) {
            console.log(error);
            setSending(false);
        }
    }

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
                                <p className='text-center  items-center'>Send a message to
                                    start Conversation</p>
                            )}

                            {
                                !loading && messages?.length > 0 && messages?.map((message) => (
                                    <div className='text-white' key={message?._id} ref={lastMessageRef}>
                                        <div className={`chat ${message.senderId === user._id ? 'chat-end' : 'chat-start'}`}>
                                            <div className='chat-image avatar'></div>
                                            <div className={`chat-bubble ${message.senderId === user._id ? 'bg-sky-600' : ''

                                                }`}>
                                                {message?.message}
                                            </div>
                                            <div className="chat-footer text-[10px] opacity-80 text-black">
                                                {new Date(message?.createdAt).toLocaleDateString('en-IN', { timeZone: 'Asia/Dhaka' })}{' '}
                                                {new Date(message?.createdAt).toLocaleTimeString('en-IN', {
                                                    hour: 'numeric',
                                                    minute: 'numeric',
                                                    timeZone: 'Asia/Dhaka',
                                                })}
                                            </div>

                                        </div>
                                    </div>
                                ))}

                        </div>
                        <form onSubmit={handelSubmit} className='rounded-full text-black border'>
                            <div className='w-full rounded-full flex items-center bg-white'>
                                <input value={sendData} onChange={handelMessages} required id='message' type='text'
                                    className='w-full bg-transparent outline-none px-4 rounded-full' />
                                <button type='submit' className='btn'>
                                    {sending ? <div className='loading loading-spinner'></div> :
                                        <span className='cursor-pointer rounded-full  w-10 h-auto p-1'>
                                            send
                                        </span>
                                    }
                                </button>
                            </div>
                        </form>
                    </div>
                </>)
            }
        </div>
    );
};

export default ChatContainer;