import React, { useState } from 'react';
import { Home, Users, MessageSquare, Settings, User, Search, Plus, Send } from 'lucide-react';

function Test() {
    const [message, setMessage] = useState('');

    const dummyChats = [
        { id: 1, name: 'User Name', message: 'Lorem ipsum dolor sit amet', time: '12:30', online: true },
        { id: 2, name: 'User Name', message: 'Consectetur adipiscing elit', time: '12:35', online: true },
        { id: 3, name: 'User Name', message: 'Sed do eiusmod tempor', time: '12:40', online: false },
        { id: 4, name: 'User Name', message: 'Ut labore et dolore magna', time: '12:45', online: true },
    ];

    const dummyMessages = [
        { id: 1, text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', sent: true, time: '12:30' },
        { id: 2, text: 'Sed do eiusmod tempor incididunt ut labore.', sent: false, time: '12:35' },
        { id: 3, text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt.', sent: true, time: '12:40' },
        { id: 4, text: 'Lorem ipsum dolor sit amet, consectetur.', sent: false, time: '12:45' },
    ];

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
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

            {/* Chat List */}
            <div className="w-80 bg-white border-r">
                <div className="p-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none"
                        />
                    </div>
                </div>

                <div className="overflow-y-auto h-[calc(100vh-88px)]">
                    {dummyChats.map((chat) => (
                        <div
                            key={chat.id}
                            className="flex items-center p-4 hover:bg-gray-50 cursor-pointer"
                        >
                            <div className="relative">
                                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                    <User size={20} className="text-gray-500" />
                                </div>
                                {chat.online && (
                                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                                )}
                            </div>
                            <div className="ml-3 flex-1">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-sm font-medium">{chat.name}</h3>
                                    <span className="text-xs text-gray-500">{chat.time}</span>
                                </div>
                                <p className="text-sm text-gray-500 truncate">{chat.message}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col bg-gray-50">
                {/* Chat Header */}
                <div className="p-4 bg-white border-b flex items-center justify-between">
                    <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <User size={20} className="text-gray-500" />
                        </div>
                        <div className="ml-3">
                            <h2 className="text-sm font-medium">User Name</h2>
                            <p className="text-xs text-green-500">Online</p>
                        </div>
                    </div>
                    <button className="p-2 hover:bg-gray-100 rounded-full">
                        <Plus size={20} className="text-gray-500" />
                    </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {dummyMessages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex ${msg.sent ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-[70%] p-3 rounded-lg ${msg.sent
                                    ? 'bg-blue-600 text-white rounded-br-none'
                                    : 'bg-white text-gray-800 rounded-bl-none'
                                    }`}
                            >
                                <p className="text-sm">{msg.text}</p>
                                <p className={`text-xs mt-1 ${msg.sent ? 'text-blue-200' : 'text-gray-500'}`}>
                                    {msg.time}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Message Input */}
                <div className="p-4 bg-white">
                    <div className="flex items-center bg-gray-50 rounded-lg p-2">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Message..."
                            className="flex-1 bg-transparent outline-none text-sm"
                        />
                        <button className="p-2 text-blue-600 hover:bg-gray-100 rounded-full">
                            <Send size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Test;