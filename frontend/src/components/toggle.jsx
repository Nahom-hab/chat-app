// src/components/ThemeToggle.jsx
import React, { useState, useEffect } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa'; // Ensure this import works correctly

const ThemeToggle = () => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const localTheme = localStorage.getItem('darkMode');
        if (localTheme) {
            setDarkMode(localTheme === 'true');
            document.documentElement.classList.toggle('dark', localTheme === 'true');
        }
    }, []);

    const handleToggle = () => {
        setDarkMode(prevMode => {
            const newMode = !prevMode;
            localStorage.setItem('darkMode', newMode);
            document.documentElement.classList.toggle('dark', newMode);
            return newMode;
        });
    };

    return (
        <div className="fixed top-4  right-4 flex items-center">
            <button
                onClick={handleToggle}
                className="relative flex items-center border-slate-300 border dark:border-slate-900 p-1 rounded-full w-16 h-8 bg-slate-200 dark:bg-gray-800 cursor-pointer"
            >
                <div
                    className={`absolute w-7 h-7 rounded-full bg-yellow-200 dark:bg-slate-900 shadow-md transform transition-transform duration-300 ${darkMode ? 'translate-x-7' : 'translate-x-0'
                        }`}
                />
                <FaSun
                    className={`absolute left-2 text-yellow-400 text-xl transition-opacity duration-300 ${darkMode ? 'opacity-0' : 'opacity-100'
                        }`}
                />
                <FaMoon
                    className={`absolute right-2 text-yellow-50 text-xl transition-opacity duration-300 ${darkMode ? 'opacity-100' : 'opacity-0'
                        }`}
                />
            </button>
        </div>
    );
};

export default ThemeToggle;
