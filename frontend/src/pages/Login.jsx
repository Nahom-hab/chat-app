import React, { useState, useEffect } from 'react';
import useConversation from '../zustand/useConversationStore';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();
    const { AuthUser, setAuthUser } = useConversation();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                const errorData = await res.json();
                if (errorData.errors) {
                    setErrors(errorData.errors); // Assuming errorData.errors is an object with keys as field names
                } else {
                    setErrors({ general: errorData.error || 'An error occurred' });
                }
                return;
            }

            const data = await res.json();
            if (data) {
                localStorage.setItem('chat-user', JSON.stringify(data));
                setAuthUser(data);
                navigate('/');
            }

        } catch (err) {
            console.log('Fetch Error:', err);
            setErrors({ general: 'An error occurred' });
        }
    };

    useEffect(() => {
        console.log('Updated AuthUser:', AuthUser);
    }, [AuthUser]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
            <div className="w-full max-w-md bg-gray-200 dark:bg-gray-800 p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className={`mt-1 p-1 pl-3 block w-full dark:text-white bg-slate-300 outline-none rounded-md shadow-sm dark:bg-gray-700 ${errors.username ? 'border-red-500 dark:border-red-500' : ''}`}
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
                            className={`mt-1 p-1 pl-3 block w-full dark:text-white bg-slate-300 outline-none rounded-md shadow-sm dark:bg-gray-700 ${errors.password ? 'border-red-500 dark:border-red-500' : ''}`}
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                    </div>
                    {errors.general && <p className="text-red-500 text-sm mb-4">{errors.general}</p>}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
