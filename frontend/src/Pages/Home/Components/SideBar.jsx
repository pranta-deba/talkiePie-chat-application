import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';


const SideBar = () => {
    const [searchInput, setSearchInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [searchUsers, setSearchUsers] = useState([]);

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

    console.log(searchUsers)

    return (
        <div className='min-h-screen w-full border-2 p-2'>
            <form onSubmit={handleSubmit} className="join">
                <input onChange={(e) => setSearchInput(e.target.value)} className="input join-item" placeholder="name" />
                <button className="btn join-item rounded-r-full">search</button>
            </form>
            <div className='divider px-2'></div>
        </div>
    );
};

export default SideBar;