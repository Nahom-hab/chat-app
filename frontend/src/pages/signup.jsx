import React, { useState, useEffect } from 'react';
import useConversation from '../zustand/useConversationStore';

const SignUpPage = () => {
    const { AuthUser, setAuthUser } = useConversation();
    const [formData, setFormData] = useState({
        full_name: '',
        username: '',
        password: '',
        gender: '',
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        console.log("Form Data:", formData);

        try {
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                const { error } = await res.json();
                setErrors({ general: error || 'An error occurred' });
                return;
            }
            const data = await res.json();
            console.log("Response Data:", data);

            if (data) {
                console.log("Data to be stored in localStorage:", data);
                localStorage.setItem('chat-user', JSON.stringify(data));
                setAuthUser(data);
            }

        } catch (err) {
            console.log("Fetch Error:", err);
            setErrors({ general: 'An error occurred' });
        }
    };

    useEffect(() => {
        console.log("Updated AuthUser:", AuthUser);
    }, [AuthUser]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
            <div className="w-full max-w-md bg-gray-200 dark:bg-gray-800 p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    {/* Form fields */}
                    <div className="mb-4">
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                        <input
                            type="text"
                            id="full_name"
                            name="full_name"
                            value={formData.full_name}
                            onChange={handleChange}
                            className={`mt-1 p-2 block w-full bg-gray-100 dark:bg-gray-700 dark:text-white rounded-md shadow-sm border border-gray-300 dark:border-gray-600 outline-none ${errors.full_name ? 'border-red-500 dark:border-red-500' : ''}`}
                        />
                        {errors.full_name && <p className="text-red-500 text-sm mt-1">{errors.full_name}</p>}
                    </div>
                    {/* Other form fields */}
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className={`mt-1 p-2 block w-full bg-gray-100 dark:bg-gray-700 dark:text-white rounded-md shadow-sm border border-gray-300 dark:border-gray-600 outline-none ${errors.username ? 'border-red-500 dark:border-red-500' : ''}`}
                        />
                        {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={`mt-1 p-2 block w-full bg-gray-100 dark:bg-gray-700 dark:text-white rounded-md shadow-sm border border-gray-300 dark:border-gray-600 outline-none ${errors.password ? 'border-red-500 dark:border-red-500' : ''}`}
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="gender" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Gender</label>
                        <select
                            id="gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className={`mt-1 p-2 block w-full bg-gray-100 dark:bg-gray-700 dark:text-white rounded-md shadow-sm border border-gray-300 dark:border-gray-600 outline-none ${errors.gender ? 'border-red-500 dark:border-red-500' : ''}`}
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                        {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
                    </div>
                    {errors.general && <p className="text-red-500 text-sm mb-4">{errors.general}</p>}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SignUpPage;
