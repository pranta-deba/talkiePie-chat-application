import { Home, MessageSquare, Settings, User, Users } from 'lucide-react';
import React from 'react';

const SIdeNav = () => {
    return (
        <div className="w-16 bg-[#0f1729] flex flex-col items-center py-6 space-y-8">
            <div className="flex flex-col items-center space-y-8">
                <button className="p-2 text-white hover:bg-blue-600 rounded-lg">
                    <Home size={20} />
                </button>
                <button className="p-2 text-white bg-blue-600 rounded-lg">
                    <MessageSquare size={20} />
                </button>
                <button className="p-2 text-white hover:bg-blue-600 rounded-lg">
                    <Users size={20} />
                </button>
                <button className="p-2 text-white hover:bg-blue-600 rounded-lg">
                    <Settings size={20} />
                </button>
            </div>
            <div className="mt-auto">
                <button className="p-2 text-white hover:bg-blue-600 rounded-lg">
                    <User size={20} />
                </button>
            </div>
        </div>
    );
};

export default SIdeNav;