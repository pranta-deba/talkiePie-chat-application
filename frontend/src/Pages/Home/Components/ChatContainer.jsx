import React from 'react';
import { useAuth } from '../../../Contexts/AuthContext';
import userConversation from '../../../Zustands/userConversation';

const ChatContainer = () => {
    const {user} = useAuth()
    const { messages, selectedConversation, setSelectedConversation } = userConversation();


    return (
        <div className='min-h-screen w-full border-2 p-2'>
            {
                selectedConversation === null ? (<>
                    <div>
                        <h1>Select a conversation to start chatting</h1>
                        <p>hey : {user?.username}</p>
                    </div>
                </>) : (<>
                    <div>

                    </div>
                </>)
            }
        </div>
    );
};

export default ChatContainer;