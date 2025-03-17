import React, { useState } from 'react';

const SideBar = () => {
    const [searchInput, setSearchInput] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(searchInput)
    }

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