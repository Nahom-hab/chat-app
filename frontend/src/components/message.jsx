import React, { useRef, useEffect } from 'react';
import { useAuthContext } from '../Context/Authcontext';
import { formatTime } from '../assets/time';

const Messages = ({ messages }) => {
    const { AuthUser } = useAuthContext();
    const endOfMessagesRef = useRef(null);

    useEffect(() => {
        if (endOfMessagesRef.current) {
            endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    }, [messages]);

    return (
        <div className={`flex-1 w-full overflow-y-auto p-4 rounded-lg flex flex-col scrollbar-custom ${document.documentElement.classList.contains('dark') ? 'dark-mode' : 'light-mode'}`}>
            {messages.length > 0 ?
                (messages.map((msg, index) => (
                    <div key={index} className={`chat ${AuthUser._id !== msg.senderID ? 'chat-end' : 'chat-start'}`}>
                        <div className="chat-image avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="User Avatar"
                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                            </div>
                        </div>
                        <div className={`chat-bubble ${AuthUser._id !== msg.senderID
                            ? 'bg-blue-500 text-white'
                            : 'dark:bg-gray-900 dark:text-white bg-slate-300 text-black'
                            }`}>
                            {msg.message}
                        </div>
                        <div className="text-xs text-gray-500">{formatTime(msg.createdAt)}</div>
                    </div>
                ))
                ) : 'Say hi'}

            <div ref={endOfMessagesRef} /> {/* This empty div is used for scrolling */}
        </div>
    );
};

export default Messages;
