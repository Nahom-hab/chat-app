import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faPaperclip } from '@fortawesome/free-solid-svg-icons';
import useConversation from '../zustand/useConversationStore';
import { useState } from 'react';

export default function SendMessage() {
    const { SelectedFriend, setMessages, messages } = useConversation();
    const [inputMessage, setInputMessage] = useState('');

    const handleInput = (e) => {
        setInputMessage(e.target.value);
    };

    const handleSend = async () => {
        if (!inputMessage.trim()) return; // Prevent sending empty messages

        try {
            const res = await fetch(`/api/message/send/${SelectedFriend._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: inputMessage }),
            });

            if (!res.ok) {
                throw new Error('Failed to send message');
            }

            const data = await res.json();

            setMessages([...messages, data]); // Update the messages array using setMessages
            setInputMessage(''); // Clear the input after sending
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div className="mt-4 flex items-center border-gray-300 dark:border-gray-600">
            <input
                type="file"
                className="hidden"
            />
            <label htmlFor="file-upload" className="cursor-pointer p-2">
                <FontAwesomeIcon
                    icon={faPaperclip}
                    className="w-6 h-6 text-gray-500 dark:text-gray-400"
                />
            </label>
            <textarea
                value={inputMessage}
                className="w-full p-2 border outline-none bg-slate-50 border-none rounded-md dark:bg-gray-900 dark:text-white resize-none ml-2"
                placeholder="Type a message..."
                onChange={handleInput}
            />
            <button
                onClick={handleSend}
                className="ml-2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 flex items-center justify-center"
            >
                <FontAwesomeIcon icon={faPaperPlane} className="w-5 h-5" />
            </button>
        </div>
    );
}
