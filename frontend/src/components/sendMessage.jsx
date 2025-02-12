import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faPaperclip, faTimes } from '@fortawesome/free-solid-svg-icons';
import useConversation from '../zustand/useConversationStore';
import { storage } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

export default function SendMessage({ setFriends, friends }) {
    const { SelectedFriend, setMessages, messages } = useConversation();
    const [inputMessage, setInputMessage] = useState('');
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploading, setUploading] = useState(false);

    const handleInput = (e) => {
        setInputMessage(e.target.value);
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        if (selectedFile) {
            const fileReader = new FileReader();
            fileReader.onload = () => {
                setPreviewUrl(fileReader.result);
                setIsModalOpen(true);
            };
            fileReader.readAsDataURL(selectedFile);
        }
    };

    const handleImageSend = async () => {
        if (!file) return;

        const storageRef = ref(storage, `images/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        setUploading(true); // Start uploading

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadProgress(progress);
            },
            (error) => {
                console.error('Upload failed:', error);
                setUploading(false);
            },
            async () => {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                console.log('File available at', downloadURL);

                try {
                    const res = await fetch(`/api/message/send/${SelectedFriend._id}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ message: downloadURL }),
                    });

                    if (!res.ok) {
                        throw new Error('Failed to send image');
                    }

                    const data = await res.json();
                    setMessages([...messages, data]);
                    setFile(null);
                    setPreviewUrl('');
                    setUploadProgress(0); // Reset upload progress after completion
                    setUploading(false); // End uploading
                    setTimeout(() => {
                        setIsModalOpen(false); // Close modal after a short delay
                    }, 500); // Adjust delay as needed
                } catch (error) {
                    console.error('Error sending image:', error);
                    setUploading(false);
                }
            }
        );
    };

    const handleSend = async () => {
        if (!inputMessage.trim()) return;

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
            const haveMessages = messages.length > 0;
            setMessages([...messages, data]);
            setInputMessage('');
            if (!haveMessages) {
                setFriends([...friends, SelectedFriend]);
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setFile(null);
        setPreviewUrl('');
    };

    return (
        <div className="mt-4 flex flex-col border-gray-300 dark:border-gray-600">
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg relative">
                        <button
                            onClick={closeModal}
                            className="absolute top-2 right-2 text-gray-700 dark:text-gray-300"
                        >
                            <FontAwesomeIcon icon={faTimes} className="w-6 h-6" />
                        </button>
                        <img src={previewUrl} alt="Preview" className="w-[320px] h-auto object-cover rounded-md" />
                        <button
                            onClick={handleImageSend}
                            className="mt-4 w-full text-slate-800 bg-slate-400 hoverbg-slate-300 dark:text-white p-2 rounded-full dark:bg-slate-900 dark:hover:bg-slate-600"
                            style={{
                                background: uploading
                                    ? `linear-gradient(to right, #4CAF50 ${uploadProgress}%, #d1d5db 0%)`
                                    : '#4CAF50',
                                color: '#fff',
                                transition: 'background 0.5s',
                            }}
                            disabled={uploading} // Disable button during upload
                        >
                            {uploading
                                ? `Uploading... ${Math.round(uploadProgress)}%`
                                : 'Send Image'}
                        </button>
                    </div>
                </div>
            )}
            <div className="flex items-center">
                <input
                    id="file-upload"
                    name='file-upload'
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
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
                    disabled={!!file}
                />
                <button
                    onClick={handleSend}
                    className="ml-2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 flex items-center justify-center"
                    disabled={!!file}
                >
                    <FontAwesomeIcon icon={faPaperPlane} className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}



