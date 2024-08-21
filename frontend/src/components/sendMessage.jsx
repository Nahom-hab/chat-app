import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faPaperclip } from '@fortawesome/free-solid-svg-icons';


export default function SendMessage({ value, handleInput, handleSend }) {
    return (
        <div className="mt-4 flex items-center border-gray-300 dark:border-gray-600">
            <input
                type="file"
                // ref={fileInputRef}
                // onChange={handleFileChange}
                className="hidden"
            />
            <label htmlFor="file-upload" className="cursor-pointer p-2">
                <FontAwesomeIcon
                    icon={faPaperclip}
                    className="w-6 h-6 text-gray-500 dark:text-gray-400"
                />
            </label>
            <textarea
                value={value}
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
    )
}
