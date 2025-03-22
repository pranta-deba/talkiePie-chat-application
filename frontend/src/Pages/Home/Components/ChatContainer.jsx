import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../../Contexts/AuthContext';
import userConversation from '../../../Zustands/userConversation';
import axios from 'axios';
import { useSocket } from '../../../Contexts/SocketContext';
import notificationSound from "../../../assets/sound/notification.mp3"
import { ArrowLeft, MessageCircle, MessageSquare, Send, User } from 'lucide-react';

const ChatContainer = ({ handelShowSidebar }) => {
    const { messages, selectedConversation, setMessage } = userConversation();
    const { socket, onlineUser } = useSocket();
    const { user } = useAuth()
    const [loading, setLoading] = useState(false);
    const lastMessageRef = useRef();
    const [sending, setSending] = useState(false);
    const [sendData, setSendData] = useState("");
    const [selectUserIsActive, setSelectUserIsActive] = useState(false);

    useEffect(() => {
        if (onlineUser && selectedConversation) {
            const isUserActive = onlineUser?.find(user => user === selectedConversation?._id)
            if (isUserActive) {
                setSelectUserIsActive(true)
            } else {
                setSelectUserIsActive(false)
            }
        }
    }, [onlineUser, selectedConversation])


    useEffect(() => {
        socket?.on('newMessage', (message) => {
            const audio = new Audio(notificationSound);
            audio.play().catch(e => console.warn("audio sound not available!"));
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
                    <div className="flex flex-col items-center justify-center h-full text-center p-6 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-md">
                        <div className="p-4 bg-blue-100 dark:bg-blue-800 rounded-full shadow-md">
                            <MessageSquare className="w-12 h-12 text-blue-500 dark:text-blue-300" />
                        </div>
                        <h1 className="mt-4 text-2xl font-semibold text-gray-800 dark:text-gray-200">
                            No Conversations Yet
                        </h1>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                            Hey, <span className="font-medium text-blue-600 dark:text-blue-400">{user?.username}</span>!<br />
                            Select a conversation to start chatting.
                        </p>
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
                                <h2 className="text-sm font-medium">{selectedConversation?.fullname}</h2>
                                {selectUserIsActive ? <p className="text-xs text-green-500">Online</p> :
                                    <p className="text-xs text-gray-400">Offline</p>}
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
                            <div className="flex-1 flex w-full h-full flex-col items-center justify-center 
                gap-4 bg-transparent">
                                <div className="loading loading-spinner"></div>
                            </div>
                        )}

                        {/* empty messages */}
                        {!loading && messages?.length === 0 && (
                            <div className="flex-1 flex flex-col items-center justify-center h-full text-center">
                                <MessageCircle className="w-12 h-12 text-gray-400" />
                                <p className="text-lg text-gray-600 mt-2">
                                    Send a message to start a conversation
                                </p>
                            </div>
                        )}

                        {/* messages */}
                        {
                            !loading && messages?.length > 0 && messages?.map((message) => (
                                <div key={message?._id} className={`flex ${message.senderId === user._id ? 'justify-end' : 'justify-start'}`} ref={lastMessageRef}>
                                    <div
                                        className={`max-w-[70%] p-3 rounded-lg ${message.senderId === user._id
                                            ? 'bg-blue-600 text-white rounded-br-none'
                                            : 'bg-white text-gray-800 rounded-bl-none'
                                            }`}
                                    >
                                        <p className="text-sm">{message?.message}</p>
                                        <p className={`text-[10px] mt-1 ${message.senderId === user._id ? 'text-blue-200' : 'text-gray-500'}`}>
                                            {new Date(message?.createdAt).toLocaleDateString('en-IN', { timeZone: 'Asia/Dhaka' })}{' '}{new Date(message?.createdAt).toLocaleTimeString('en-IN', {
                                                hour: 'numeric',
                                                minute: 'numeric',
                                                timeZone: 'Asia/Dhaka',
                                            })}
                                        </p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>


                    {/* Message Input */}
                    <div className="p-4 bg-white">
                        <form onSubmit={handelSubmit} className="flex items-center bg-gray-50 rounded-lg p-2">
                            <input
                                type="text"
                                value={sendData} onChange={handelMessages}
                                placeholder="Message..."
                                className="flex-1 bg-transparent outline-none text-sm"
                            />
                            <button disabled={sending} type='submit' className="p-2 text-blue-600 hover:bg-gray-100 rounded-full">
                                <Send size={20} />
                            </button>
                        </form>
                    </div>
                </>)
            }
        </>
    );
};

export default ChatContainer;