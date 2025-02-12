import React, { useRef, useEffect, useCallback } from 'react';
import { formatTime } from '../assets/time';
import useConversation from '../zustand/useConversationStore';
import ListenToMessages from '../hook/ListenToMessages';
import { detectTextType, isImageUrl } from '../hook/detectemoji';

const Messages = () => {
    const { SelectedFriend, AuthUser, messages, setMessages } = useConversation();
    const endOfMessagesRef = useRef(null);
    const containerRef = useRef(null);

    ListenToMessages();

    // Scroll to bottom function
    const scrollToBottom = useCallback(() => {
        if (endOfMessagesRef.current) {
            endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    }, [messages]);

    // Scroll to bottom after messages update
    useEffect(() => {
        scrollToBottom();
    }, [messages, scrollToBottom]);

    // Ensure scrolling after images load
    const handleImageLoad = () => {
        scrollToBottom();
    };

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.style.maxHeight = 'calc(100vh - 100px)'; // Adjust as needed
        }

        // Optional: Use MutationObserver if needed
        const observer = new MutationObserver(() => {
            scrollToBottom();
        });

        if (containerRef.current) {
            observer.observe(containerRef.current, { childList: true });
        }

        return () => {
            if (observer) observer.disconnect();
        };
    }, [scrollToBottom]);

    return (
        <div
            ref={containerRef}
            className={`flex-1 w-full overflow-y-auto p-4 rounded-lg flex flex-col scrollbar-custom ${document.documentElement.classList.contains('dark') ? 'dark-mode' : 'light-mode'}`}
        >
            {messages.length > 0 ? (
                messages.map((msg, index) => (
                    <div key={msg._id || index} className={`chat ${msg.shouldShake ? 'shake' : ''} ${AuthUser._id !== msg.senderID ? 'chat-start' : 'chat-end'}`}>

                        {detectTextType(msg.message) === 'emoji' ? (
                            <div className='text-4xl mr-[-7px] mb-1'>
                                {msg.message}
                            </div>
                        ) : (isImageUrl(msg.message) ? (
                            <div>
                                <img
                                    src={msg.message}
                                    className='w-44 rounded-xl object-cover'
                                    alt="Sent content"
                                    onLoad={handleImageLoad} // Ensure scroll happens after image loads
                                />
                            </div>
                        ) : (
                            <div className={`chat-bubble ${AuthUser._id !== msg.senderID
                                ? 'bg-blue-500 text-white'
                                : 'dark:bg-gray-900 dark:text-white bg-slate-300 text-black'
                                }`}>
                                {msg.message}
                            </div>
                        ))}
                        <div className="text-xs text-gray-500">{formatTime(msg.createdAt)}</div>
                    </div>
                ))
            ) : SelectedFriend ? (
                <div className='flex justify-center items-center m-auto text-4xl'>
                    say hi
                    <div className="hand-emoji">🖐️</div>
                </div>
            ) : (
                <div className='flex justify-center items-center m-auto'>
                    <h1 className='text-4xl text-center'>
                        <span className='block'>Select A &#128515; Friend</span> to Chat
                    </h1>
                </div>
            )}
            <div ref={endOfMessagesRef} /> {/* This empty div is used for scrolling */}
        </div>
    );
};

export default Messages;
