import { LogOut, MessageSquare, Settings } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Modals from './Modals';

const SIdeNav = ({ handelLogOut }) => {
    const [navActive, setNavActive] = useState('chats');
    const [profileModal, setProfileModal] = useState(false);

    const handleNavBgColor = (nav) => {
        if (nav === 'profile') {
            setNavActive(nav)
            setProfileModal(true)

        }
        if (nav === 'chats') {
            setNavActive(nav)
        }
    }
    const handleClosedModel = (trigger) => {
        setProfileModal(trigger);
        setNavActive('chats');
    }

    return (<>
        <div className="w-16 bg-[#0f1729] flex flex-col items-center py-6 space-y-8">
            <div className="flex flex-col items-center space-y-8">
                <button onClick={() => handleNavBgColor('chats')} className={`cursor-pointer p-2 text-white ${navActive === 'chats' ? "bg-blue-600" : 'hover:bg-blue-600'} rounded-lg`}>
                    <MessageSquare size={20} />
                </button>
                <button onClick={() => handleNavBgColor('profile')} className={`cursor-pointer p-2 text-white ${navActive === 'profile' ? "bg-blue-600" : 'hover:bg-blue-600'} rounded-lg`}>
                    <Settings size={20} />
                </button>
            </div>
            <div className="mt-auto">
                <button onClick={handelLogOut} className="p-2 text-white hover:bg-blue-600 rounded-lg cursor-pointer" title='log out'>
                    <LogOut size={20} />
                </button>
            </div>
        </div>
        {profileModal && <Modals handleClosedModel={handleClosedModel} />}
    </>
    );
};

export default SIdeNav;