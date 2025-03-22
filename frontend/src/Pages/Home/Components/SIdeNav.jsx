import { LogOut, MessageSquare, Settings, User } from 'lucide-react';
import React, { useState } from 'react';
import Modals from './Modals';
import { useAuth } from '../../../Contexts/AuthContext';

const SIdeNav = ({ handelLogOut, loading }) => {
    const [profileModal, setProfileModal] = useState(false);
    const { user } = useAuth()


    return (<>
        <div className="w-16 bg-[#0f1729A4] flex flex-col items-center py-6 space-y-8">
            <div className="flex flex-col items-center space-y-8">
                <button className={`cursor-pointer p-2 text-white bg-blue-600 rounded-lg`} title='Chats'>
                    <MessageSquare size={20} />
                </button>
                <div title='Profile' onClick={() => setProfileModal(true)} className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer">
                    {
                        !user?.profileImage ?
                            <User size={20} className="text-gray-500" /> :
                            <img src={user?.profileImage} alt='user.img' />
                    }
                </div>
            </div>
            <div className="mt-auto">
                <button disabled={loading} onClick={handelLogOut} className="p-2 text-white hover:bg-blue-600 rounded-lg cursor-pointer" title='log out'>
                    <LogOut size={20} />
                </button>
            </div>
        </div>
        {profileModal && <Modals setProfileModal={setProfileModal} />}
    </>
    );
};

export default SIdeNav;