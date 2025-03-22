import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../../Contexts/AuthContext';
import userConversation from '../../../Zustands/userConversation';
import axios from 'axios';
import { useSocket } from '../../../Contexts/SocketContext';
import notificationSound from "../../../assets/sound/notification.mp3"
import { ArrowLeft, User } from 'lucide-react';

const ChatContainer = ({ handelShowSidebar }) => {
    const { messages, selectedConversation, setMessage } = userConversation();
    const { socket } = useSocket();
    const { user } = useAuth()
    const [loading, setLoading] = useState(false);
    const lastMessageRef = useRef();
    const [sending, setSending] = useState(false);
    const [sendData, setSendData] = useState("");

    useEffect(() => {
        socket?.on('newMessage', (message) => {
            const audio = new Audio(notificationSound);
            audio.play().catch(e => console.log(e));
            setMessage([...messages, message]);
        });

        return () => socket?.off("newMessage");
    }, [socket, setMessage, messages]);

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
                setMessage(data.data);
                setLoading(false);
            } catch (error) {
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
            setMessage([...messages, data?.data]);
            setSendData('');
            setSending(false);
        } catch (error) {
            setSending(false);
        }
    }


    return (
        <>
            {
                selectedConversation === null ? (<>
                    <div>
                        <h1>Select a conversation to start chatting</h1>
                        <p>hey : {user?.username}</p>
                    </div>
                </>) : (<>
                    {/* Chat Header */}
                    <div className="p-4 bg-white border-b flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                {!selectedConversation?.profileImage ? <User size={20} className="text-gray-500" /> :
                                    <img src={selectedConversation?.profileImage} alt='user.img' />}
                            </div>
                            <div className="ml-3">
                                <h2 className="text-sm font-medium">User Name</h2>
                                <p className="text-xs text-green-500">Online</p>
                            </div>
                        </div>
                        <button onClick={() => handelShowSidebar()} className="md:hidden p-2 hover:bg-gray-100 rounded-full cursor-pointer" title='back'>
                            <ArrowLeft size={20} className="text-gray-500" />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">

                        {/* messages load */}
                        {loading && (
                            <div className="flex w-full h-full flex-col items-center justify-center 
                gap-4 bg-transparent">
                                <div className="loading loading-spinner"></div>
                            </div>
                        )}

                        {/* empty messages */}
                        {!loading && messages?.length === 0 && (
                            <p className='text-center  items-center'>Send a message to
                                start Conversation</p>
                        )}

                        {/* messages */}
                        {
                            !loading && messages?.length > 0 && messages?.map((message) => (
                                <div key={message?._id}>
                                    
                                </div>
                            ))
                        }
                    </div>




                    <div>
                        <div className='p-3 overflow-auto'>
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
        </>
    );
};

export default ChatContainer;