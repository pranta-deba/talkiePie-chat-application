import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../../../Contexts/AuthContext';
import { removeDataFromLocalStorage } from '../../../utils/localStorage';
import { useNavigate } from 'react-router-dom';
import userConversation from '../../../Zustands/userConversation';
import { useSocket } from '../../../Contexts/SocketContext';


const SideBar = ({ handelUserSelect }) => {
    const { user: authUser, setUser } = useAuth()
    const searchInputRef = useRef()
    const [searchInput, setSearchInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [searchUsers, setSearchUsers] = useState([]);
    const [chatUsers, setChatUsers] = useState([]);
    const [selectedUserId, setSetSelectedUserId] = useState(null);
    const navigate = useNavigate();
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
            console.log(newMessageUsers)
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
                }).catch(err => toast.error("Something went wrong!"));
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

    // logout
    const handelLogOut = async () => {
        const confirmLogout = window.prompt("type 'UserName' To LOGOUT");
        if (confirmLogout === authUser.username) {
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
                    toast.error(data.message || "something went wrong!");
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
        <div className='min-h-screen w-full border-2 p-2'>
            <form onSubmit={handleSubmit} className="join">
                <input ref={searchInputRef} onChange={(e) => setSearchInput(e.target.value)} className="input join-item" placeholder="name" />
                <button className="btn join-item rounded-r-full">search</button>
            </form>
            <div className='divider px-2'></div>

            {searchUsers?.length > 0 ?
                (<>
                    <div>
                        {searchUsers.map((user, index) => (
                            <div key={index + 1}>
                                <div
                                    onClick={() => handelUserClick(user)}
                                    className={`flex gap-3 
                                                items-center rounded 
                                                p-2 py-1 cursor-pointer
                                                ${selectedUserId === user?._id ? 'bg-sky-500' : ''
                                        } `}>
                                    <div
                                        className={`avatar`}
                                    >
                                        <div className="w-12 rounded-full">
                                            <img src={user?.profileImage} alt='user.img' />
                                        </div>
                                        {/* Socket is Online */}
                                        {isOnlineSearchUser[index] && <div className='absolute top-1 right-1 w-2 h-2 rounded-full bg-green-600 border-1 border-white'></div>}
                                    </div>
                                    <div className='flex flex-col flex-1'>
                                        <p className='font-bold text-gray-950'>{user.username}</p>
                                    </div>
                                    {/* <div>
                                        {newMessageUsers?.receiverId === authUser._id && newMessageUsers.senderId === user._id && selectedConversation?._id !== user?._id ?
                                            <div className="rounded-full bg-green-700 text-sm text-white px-[4px]">+1</div>
                                            : <></>

                                        }
                                    </div> */}
                                    {
                                        newMessageUsers?.length > 0 && newMessageUsers.find(mgs => mgs.receiverId === authUser._id && mgs.senderId === user._id) && selectedConversation?._id !== user?._id ?
                                            <div className="rounded-full bg-green-700 text-sm text-white px-[4px]">+1</div>
                                            : <></>
                                    }
                                </div>
                                <div className='divider divide-solid px-3 h-[1px]'></div>
                            </div>
                        )
                        )}
                    </div>
                    <div>
                        <button onClick={handleSearchBack} className='btn'>back</button>
                    </div>
                </>) :
                (<>
                    {
                        chatUsers.length > 0 ? (<>
                            <div>
                                {chatUsers.map((user, index) => (
                                    <div key={index + 2}>
                                        <div
                                            onClick={() => handelUserClick(user)}
                                            className={`flex gap-3 
                                                items-center rounded 
                                                p-2 py-1 cursor-pointer
                                                ${selectedUserId === user?._id ? 'bg-sky-500' : ''
                                                } `}>

                                            <div
                                                className={`avatar`}
                                            >
                                                <div className="w-12 rounded-full">
                                                    <img src={user?.profileImage} alt='user.img' />
                                                </div>
                                                {/* Socket is Online */}
                                                {isOnline[index] && <div className='absolute top-1 right-1 w-2 h-2 rounded-full bg-green-600 border-1 border-white'></div>}

                                            </div>
                                            <div className='flex flex-col flex-1'>
                                                <p className='font-bold text-gray-950'>{user.username}</p>
                                            </div>
                                            {/* <div>
                                                {newMessageUsers?.receiverId === authUser._id && newMessageUsers.senderId === user._id && selectedConversation?._id !== user?._id ?
                                                    <div className="rounded-full bg-green-700 text-sm text-white px-[4px]">+1</div> : <></>
                                                }
                                            </div> */}
                                            {
                                                newMessageUsers?.length > 0 && newMessageUsers.find(mgs => mgs.receiverId === authUser._id && mgs.senderId === user._id) && selectedConversation?._id !== user?._id ?
                                                    <div className="rounded-full bg-green-700 text-sm text-white px-[4px]">+1</div>
                                                    : <></>
                                            }
                                        </div>
                                        <div className='divider divide-solid px-3 h-[1px]'></div>
                                    </div>
                                )
                                )}
                            </div>
                        </>) : (<>
                            <div>
                                <h1>you are alone!</h1>
                                <h1>search user name to chat!</h1>
                            </div>
                        </>)
                    }
                    <div className='mt-auto px-1 py-1 flex'>
                        <button onClick={handelLogOut} className='hover:bg-red-600  cursor-pointer hover:text-white rounded-lg btn'>
                            Logout
                        </button>
                    </div>
                </>)
            }
        </div>
    );
};

export default SideBar;