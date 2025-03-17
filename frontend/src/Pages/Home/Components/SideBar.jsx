import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';


const SideBar = () => {
    const searchInputRef = useRef()
    const [searchInput, setSearchInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [searchUsers, setSearchUsers] = useState([]);
    const [chatUsers, setChatUsers] = useState([]);
    const [selectedUserId, setSetSelectedUserId] = useState(null);

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
                console.log(error);
                toast.error(error?.response?.data?.message || "something went wrong!");
            }
        }
        fetchChatData();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // validate input
        if (!searchInput) {
            toast.warn("Please enter a name");
            setLoading(false);
            return;
        }
        try {
            const { data } = await axios.get(`/api/user/search?search=${searchInput}`);
            if (data.success && data.data.length === 0) {
                toast.info('User not found!');
                setLoading(false);
            } else {
                setSearchUsers(data.data);
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
            toast.error(error?.response?.data?.message || "something went wrong!");
        }
    }

    //show which user is selected
    const handelUserClick = (user) => {
        setSetSelectedUserId(user._id);
    }

    //back from search result
    const handleSearchBack = () => {
        setSearchUsers([]);
        setSearchInput('');
        searchInputRef.current.value = '';
    }


    console.log({ searchUsers, chatUsers })

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
                            <div key={user._id}>
                                <div
                                    onClick={() => handelUserClick(user)}
                                    className={`flex gap-3 
                                                items-center rounded 
                                                p-2 py-1 cursor-pointer
                                                ${selectedUserId === user?._id ? 'bg-sky-500' : ''
                                        } `}>

                                    {/* Socket is Online */}
                                    <div
                                    // className={`avatar ${isOnline[index] ? 'online' : ''}`}
                                    >
                                        <div className="w-12 rounded-full">
                                            <img src={user?.profileImage} alt='user.img' />
                                        </div>
                                    </div>
                                    <div className='flex flex-col flex-1'>
                                        <p className='font-bold text-gray-950'>{user.username}</p>
                                    </div>
                                    {/* <div>
                                                {newMessageUsers.receiverId === authUser._id && newMessageUsers.senderId === user._id ?
                                                    <div className="rounded-full bg-green-700 text-sm text-white px-[4px]">+1</div> : <></>
                                                }
                                            </div> */}
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
                                    <div key={user._id}>
                                        <div
                                            onClick={() => handelUserClick(user)}
                                            className={`flex gap-3 
                                                items-center rounded 
                                                p-2 py-1 cursor-pointer
                                                ${selectedUserId === user?._id ? 'bg-sky-500' : ''
                                                } `}>

                                            {/* Socket is Online */}
                                            <div
                                            // className={`avatar ${isOnline[index] ? 'online' : ''}`}
                                            >
                                                <div className="w-12 rounded-full">
                                                    <img src={user?.profileImage} alt='user.img' />
                                                </div>
                                            </div>
                                            <div className='flex flex-col flex-1'>
                                                <p className='font-bold text-gray-950'>{user.username}</p>
                                            </div>
                                            {/* <div>
                                                {newMessageUsers.receiverId === authUser._id && newMessageUsers.senderId === user._id ?
                                                    <div className="rounded-full bg-green-700 text-sm text-white px-[4px]">+1</div> : <></>
                                                }
                                            </div> */}
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
                </>)
            }
        </div>
    );
};

export default SideBar;