import React, { useState } from 'react';
import useConversation from '../zustand/useConversationStore';

export default function EditProfile({ onClose }) {
    const { AuthUser, setAuthUser } = useConversation();
    const [formData, setFormData] = useState({
        full_name: AuthUser?.full_name || '',
        gender: AuthUser?.gender || '',
        username: AuthUser?.username || '',
        profilePic: AuthUser?.profilePic || '',
    });
    const [imageUpload, setImageUpload] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setImageUpload(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (imageUpload) {
            // Handle image upload (Firebase logic here)
            // On successful upload:
            // const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            // const updatedFormData = { ...formData, profilePic: downloadURL };
            // setFormData(updatedFormData);
            // setAuthUser(updatedFormData);
        } else {
            setAuthUser(formData);
        }

        alert('Profile updated successfully!');
    };

    return (
        <div className='bg-gray-100 p-6 rounded-lg w-11/12 md:w-1/3 relative'>
            <button
                onClick={onClose}
                className='absolute top-2 right-2 bg-red-500 text-white p-2 rounded'
            >
                X
            </button>
            <h2 className='text-xl font-bold mb-4'>Edit Profile</h2>
            <form onSubmit={handleSubmit} className='flex flex-col space-y-4'>
                <div className='flex flex-col items-center'>
                    <label htmlFor='file-upload'>
                        <img
                            src={formData.profilePic || '/default-profile.png'}
                            alt='Profile'
                            className='w-20 h-20 object-cover rounded-full cursor-pointer mb-2'
                        />
                    </label>
                    <input
                        id='file-upload'
                        type='file'
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                    {uploading && <p>Uploading image...</p>}
                </div>

                <div className='flex flex-col'>
                    <label htmlFor='full_name'>Full Name</label>
                    <input
                        type='text'
                        id='full_name'
                        name='full_name'
                        value={formData.full_name}
                        onChange={handleChange}
                        className='p-2 rounded-md border-none bg-slate-200'
                    />
                </div>

                <div className='flex flex-col'>
                    <label htmlFor='gender'>Gender</label>
                    <select
                        id='gender'
                        name='gender'
                        value={formData.gender}
                        onChange={handleChange}
                        className='p-2 rounded-md border-none bg-slate-200'
                    >
                        <option value=''>Select Gender</option>
                        <option value='male'>Male</option>
                        <option value='female'>Female</option>
                    </select>
                </div>

                <div className='flex flex-col'>
                    <label htmlFor='username'>Username</label>
                    <input
                        type='text'
                        id='username'
                        name='username'
                        value={formData.username}
                        onChange={handleChange}
                        className='p-2 rounded-md border-none bg-slate-200'
                    />
                </div>

                <button
                    type='submit'
                    className='mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600'
                    disabled={uploading}
                >
                    {uploading ? 'Uploading...' : 'Save Changes'}
                </button>
            </form>
        </div>
    );
}
