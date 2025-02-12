import React, { useEffect, useRef, useState } from 'react';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../firebase'; // Adjust the import path as needed
import useConversation from '../zustand/useConversationStore';

export default function EditProfile({ onClose }) {
    const fileRef = useRef(null);
    const { AuthUser, setAuthUser } = useConversation();
    const [file, setFile] = useState(null);
    const [filePercent, setFilePercent] = useState(0);
    const [fileUploadError, setFileUploadError] = useState(false);
    const [formData, setFormData] = useState({
        full_name: AuthUser?.full_name || '',
        gender: AuthUser?.gender || '',
        username: AuthUser?.username || '',
        profilePic: AuthUser?.profilePic || '',
        password: '', // Initialize password field
    });
    const [loading, setLoading] = useState(false);
    const [submitStatus, setSubmitStatus] = useState('');

    useEffect(() => {
        if (file) {
            handleFileUpload(file);
        }
    }, [file]);

    const handleFileUpload = (file) => {
        const storageRef = ref(storage, `profile_pictures/${new Date().getTime()}_${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setFilePercent(Math.round(progress));
            },
            (error) => {
                console.error('Error uploading file', error);
                setFileUploadError(true);
                setFilePercent(0);
            },
            async () => {
                try {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    setFormData((prevState) => ({ ...prevState, profilePic: downloadURL }));
                    setAuthUser({ ...AuthUser, profilePic: downloadURL });
                    setFilePercent(0);
                } catch (error) {
                    console.error('Error getting download URL', error);
                    setFileUploadError(true);
                }
            }
        );
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitStatus('Updating...');
        setLoading(true);

        try {
            // Assuming you have an API endpoint to update user data
            const res = await fetch(`/api/user/${AuthUser._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                const updatedUser = await res.json();
                setAuthUser(updatedUser);
                localStorage.setItem('chat-user', JSON.stringify(updatedUser));
                setSubmitStatus('Profile updated successfully!');
            } else {
                setSubmitStatus('Failed to update profile.');
            }
        } catch (error) {
            console.error('Error updating profile', error);
            setSubmitStatus('Error updating profile.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='bg-gray-100 dark:bg-gray-800 p-6 rounded-lg w-11/12 md:w-1/3 relative'>
            <button
                onClick={onClose}
                className='absolute top-2 right-2 bg-slate-500 dark:bg-slate-700 text-white p-2 px-4 rounded'
            >
                X
            </button>
            <h2 className='text-xl font-bold mb-4 text-gray-900 dark:text-gray-100'>Edit Profile</h2>
            <input
                onChange={handleFileChange}
                type="file"
                hidden
                accept="image/*"
                ref={fileRef}
            />
            <div className='flex justify-center'>
                <img
                    onClick={() => fileRef.current.click()}
                    src={formData.profilePic || '/default-profile.png'}
                    alt='Profile'
                    className='w-20 h-20 object-cover rounded-full cursor-pointer mb-2'
                />
            </div>

            <div>
                {fileUploadError && <p className='text-red-500'>Error uploading image</p>}
                {filePercent > 0 && filePercent < 100 && (
                    <p className='text-gray-700 dark:text-gray-300'>File uploading {filePercent}%</p>
                )}
                {filePercent === 100 && <p className='text-green-500'>File uploaded successfully</p>}
            </div>
            <form onSubmit={handleSubmit} className='flex flex-col space-y-4'>
                <input
                    type='text'
                    name='full_name'
                    value={formData.full_name}
                    onChange={handleChange}
                    placeholder='Full Name'
                    className='p-2 rounded-md border-none bg-slate-200 dark:bg-slate-700 dark:text-gray-100'
                />
                <select
                    name='gender'
                    value={formData.gender}
                    onChange={handleChange}
                    className='p-2 rounded-md border-none bg-slate-200 dark:bg-slate-700 dark:text-gray-100'
                >
                    <option value='' className='text-gray-600 dark:text-gray-300'>Select Gender</option>
                    <option value='male' className='text-gray-600 dark:text-gray-300'>Male</option>
                    <option value='female' className='text-gray-600 dark:text-gray-300'>Female</option>
                </select>
                <input
                    type='text'
                    name='username'
                    value={formData.username}
                    onChange={handleChange}
                    placeholder='Username'
                    className='p-2 rounded-md border-none bg-slate-200 dark:bg-slate-700 dark:text-gray-100'
                />
                <input
                    type='password'
                    name='password'
                    value={formData.password}
                    onChange={handleChange}
                    placeholder='Password'
                    className='p-2 rounded-md border-none bg-slate-200 dark:bg-slate-700 dark:text-gray-100'
                />
                <button
                    type='submit'
                    className='mt-4 bg-blue-500 dark:bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-600 dark:hover:bg-blue-700'
                    disabled={loading || filePercent > 0}
                >
                    {submitStatus || 'Save Changes'}
                </button>
            </form>
        </div>
    );
}
