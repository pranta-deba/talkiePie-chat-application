import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../../../Contexts/AuthContext';
import userConversation from '../../../Zustands/userConversation';
import { useSocket } from '../../../Contexts/SocketContext';
import { ArrowLeft, Search, User } from 'lucide-react';


const SideBar = ({ handelUserSelect }) => {
    const { user: authUser } = useAuth()
    const searchInputRef = useRef()
    const [searchInput, setSearchInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [searchUsers, setSearchUsers] = useState([]);
    const [chatUsers, setChatUsers] = useState([]);
    const [selectedUserId, setSetSelectedUserId] = useState(null);
    const { messages, selectedConversation, setSelectedConversation } = userConversation();
    const { onlineUser, socket } = useSocket();
    const [newMessageUsers, setNewMessageUsers] = useState([]);


    // online chat users
    const nowOnline = chatUsers.map((user) => (user._id));
    const isOnline = nowOnline.map(userId => onlineUser.includes(userId));

    // online search users
    const nowOnlineSearchUser = searchUsers.map((user) => (user._id));
    const isOnlineSearchUser = nowOnlineSearchUser.map(userId => onlineUser.includes(userId));

    // incoming new messages
    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            const existsNewMessage = newMessageUsers?.find(mgs => mgs.senderId === newMessage.senderId);
            if (!existsNewMessage) {
                setNewMessageUsers([newMessage, ...newMessageUsers]);
            }
            // setNewMessageUsers([newMessage, ...newMessageUsers.filter(oldMessages => oldMessages.senderId !== newMessage.senderId)]);


            const senderExists = chatUsers.find(user => user._id === newMessage.senderId);
            if (!senderExists) {
                axios.get(`/api/user/${newMessage.senderId}`).then(({ data }) => {
                    if (data.success) {
                        const latestUsers = chatUsers.filter(user => user._id !== newMessage.senderId);
                        setChatUsers([data.data, ...latestUsers]);
                    }
                }).catch(() => toast.error("Something went wrong!"));
            } else {
                const latestUsers = chatUsers.filter(user => user._id !== newMessage.senderId);
                setChatUsers([senderExists, ...latestUsers]);
            }
        })
        return () => socket?.off("newMessage");
    }, [socket, messages]);


    // current chats list get
    useEffect(() => {
        const fetchChatData = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get('/api/user/current-chatters');
                if (data.success && data.data.length > 0) {
                    setChatUsers(data.data);
                    setLoading(false);
                }
            } catch (error) {
                setLoading(false);
                toast.error(error?.response?.data?.message || "something went wrong!");
            }
        }
        fetchChatData();
    }, [])


    //  search users
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (!searchInput) {
            toast.error("Please enter a name");
            setLoading(false);
            return;
        }
        try {
            const { data } = await axios.get(`/api/user/search?search=${searchInput}`);
            if (data.success && data.data.length === 0) {
                toast.error('User not found!');
                setLoading(false);
            } else {
                setSearchUsers(data.data);
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            toast.error(error?.response?.data?.message || "something went wrong!");
        }
    }

    //show which user is selected
    const handelUserClick = (user) => {
        handelUserSelect(user);
        setSelectedConversation(user);
        setSetSelectedUserId(user._id);
        // remove from new message list
        const newMessageUsersFiltered = newMessageUsers.filter(mgs => mgs.senderId !== user._id);
        setNewMessageUsers(newMessageUsersFiltered);
    }

    //back from search result
    const handleSearchBack = () => {
        setSearchUsers([]);
        setSearchInput('');
        searchInputRef.current.value = '';
    }


    return (
        <>
            {/* search box */}
            <div className="p-4 flex justify-center items-center">
                {searchUsers?.length > 0 && <div>
                    <button onClick={handleSearchBack} className='mr-2 cursor-pointer'><ArrowLeft /></button>
                </div>}
                <form onSubmit={handleSubmit} className="relative flex-1">
                    <input
                        type="text"
                        ref={searchInputRef}
                        placeholder="Search"
                        onChange={(e) => setSearchInput(e.target.value)}
                        className="w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none"
                    />
                    <button type='submit' className='absolute right-3 top-2.5 cursor-pointer'><Search className=" text-gray-400" size={20} /></button>
                </form>
            </div>

            <div className='overflow-y-auto h-[calc(100vh-88px)]'>
                {
                    searchUsers?.length > 0 ?
                        // search users
                        <>
                            {
                                searchUsers.map((user, index) => (
                                    <div key={index + 1} onClick={() => handelUserClick(user)}
                                        className={`flex items-center p-4 hover:bg-gray-50 cursor-pointer ${selectedUserId === user?._id ? 'bg-gray-50' : ''}`}>
                                        <div className="relative">
                                            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                                {
                                                    !user?.profileImage ?
                                                        <User size={20} className="text-gray-500" /> :
                                                        <img src={user?.profileImage} alt='user.img' />
                                                }
                                            </div>
                                            {isOnlineSearchUser[index] && (
                                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                                            )}
                                        </div>
                                        <div className="ml-3 flex-1">
                                            <div className="flex justify-between items-center">
                                                <h3 className="text-sm font-medium">{user?.fullname}</h3>
                                                {newMessageUsers?.length > 0 && newMessageUsers.find(mgs => mgs.receiverId === authUser._id && mgs.senderId === user._id) && selectedConversation?._id !== user?._id && <span className={`text-xs text-gray-500 ${selectedUserId === user?._id ? "text-white" : ""}`}>
                                                    {user?.time || "+1"}
                                                </span>}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </>
                        :
                        // chat list users
                        <>
                            {
                                chatUsers.length > 0 ?
                                    // chat list users shown
                                    <>
                                        {chatUsers.map((user, index) => (
                                            <div key={index + 2} onClick={() => handelUserClick(user)}
                                                className={`flex items-center p-4 hover:bg-gray-50 cursor-pointer  ${selectedUserId === user?._id ? 'bg-gray-50' : ''}`}>

                                                <div className="relative">
                                                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                                        {
                                                            !user?.profileImage ?
                                                                <User size={20} className="text-gray-500" /> :
                                                                <img src={user?.profileImage} alt='user.img' />
                                                        }
                                                    </div>
                                                    {isOnline[index] && (
                                                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                                                    )}
                                                </div>
                                                <div className="ml-3 flex-1">
                                                    <div className="flex justify-between items-center">
                                                        <h3 className="text-sm font-medium">{user?.fullname}</h3>
                                                        {newMessageUsers?.length > 0 && newMessageUsers.find(mgs => mgs.receiverId === authUser._id && mgs.senderId === user._id) && selectedConversation?._id !== user?._id && <span className={`text-xs text-gray-500 ${selectedUserId === user?._id ? "text-white" : ""}`}>
                                                            {user?.time || "+1"}
                                                        </span>}

                                                    </div>
                                                </div>
                                            </div>
                                        )
                                        )}
                                    </>
                                    :
                                    // no chat users available
                                    <>
                                        <div>
                                            <h1>you are alone!</h1>
                                            <h1>search user name to chat!</h1>
                                        </div>
                                    </>
                            }
                        </>
                }
            </div>
        </>
    );
};

export default SideBar;