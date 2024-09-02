import React, { useRef, useEffect } from 'react';
import { formatTime } from '../assets/time';
import useConversation from '../zustand/useConversationStore';
import ListenToMessages from '../hook/ListenToMessages';

const Messages = () => {
    const { SelectedFriend, AuthUser, messages, setMessages } = useConversation();
    const endOfMessagesRef = useRef(null);
    ListenToMessages()


    useEffect(() => {
        if (SelectedFriend) {
            const getMessages = async () => {
                try {
                    const res = await fetch(`/api/message/${SelectedFriend._id}`);
                    if (!res.ok) {
                        throw new Error('Failed to fetch messages');
                    }
                    const data = await res.json();
                    setMessages(Array.isArray(data) ? data : []); // Ensure data is an array
                } catch (error) {
                    console.error('Error fetching messages:', error);
                    setMessages([]);
                }
            };
            getMessages();
        }
    }, [SelectedFriend, setMessages]);

    useEffect(() => {
        if (endOfMessagesRef.current) {
            endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    }, [messages]);

    return (
        <div className={`flex-1 w-full overflow-y-auto p-4 rounded-lg flex flex-col scrollbar-custom ${document.documentElement.classList.contains('dark') ? 'dark-mode' : 'light-mode'}`}>
            {messages.length > 0 ? (
                messages.map((msg, index) => (
                    <div key={index} className={`chat  ${msg.shouldShake ? 'shake' : ''} ${AuthUser._id !== msg.senderID ? 'chat-end' : 'chat-start'}`}>
                        <div className="chat-image  avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="User Avatar"
                                    src={msg.avatarUrl || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} />
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
