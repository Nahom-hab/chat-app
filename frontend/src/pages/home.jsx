import React, { useState, useEffect } from 'react';
import SearchBar from '../components/searchbar';
import MainSidebar from '../components/sidebar';
import SideBarFriends from '../components/SideBarFriends';
import SendMessage from '../components/sendMessage';
import Messages from '../components/message';
import SearchedUsers from '../components/searchedUsers';
import MessageHeader from '../components/MessageHeader';
import EditProfile from '../components/profile';

const HomePage = () => {
    const [friends, setFriends] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchedUsers, setSearchedUsers] = useState(null);
    const [showProfile, setShowProfile] = useState(false);

    useEffect(() => {
        const getFriends = async () => {
            try {
                const res = await fetch('/api/user/getFriends');
                const data = await res.json();
                setFriends(data);
            } catch (error) {
                console.log(error);
            }
        };
        getFriends();
    }, []);

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
        handleSearch(e.target.value);
    };

    const handleSearch = async (term) => {
        if (term) {
            try {
                const res = await fetch(`/api/user/search?searchTerm=${term}`);
                const data = await res.json();
                setSearchedUsers(data);
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <div className="relative flex h-screen bg-gray-100 dark:bg-gray-900">
            {/* Background Content */}
            <div className={`flex h-full w-full ${showProfile ? 'blur-sm' : ''} transition duration-300`}>
                {/* Sidebar */}
                <div className="w-[28.5%] flex-row bg-gray-200 dark:bg-gray-800 flex-shrink-0 flex">
                    <MainSidebar setShowProfile={() => setShowProfile(true)} />
                    <div className="mt-4">
                        <SearchBar
                            handleChange={handleChange}
                            value={searchTerm}
                        />
                        {searchTerm !== '' ?
                            <SearchedUsers
                                searchedUsers={searchedUsers}
                                setSearchTerm={setSearchTerm}
                            /> :
                            <SideBarFriends
                                friends={friends}
                            />
                        }
                    </div>
                </div>

                {/* Chat Area */}
                <div className="flex-1 flex flex-col ml-2 p-2 bg-gray-100 dark:bg-gray-900">
                    <MessageHeader friends={friends} />
                    <div className="flex-1 w-full overflow-y-auto bg-gray-200 dark:bg-gray-800 p-4 rounded-lg flex flex-col scrollbar-dark dark:scrollbar-dark scrollbar-light">
                        <Messages />
                        <SendMessage />
                    </div>
                </div>
            </div>

            {/* Dark Overlay */}
            {showProfile && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-40">
                    <EditProfile onClose={() => setShowProfile(false)} />
                </div>
            )}

            {/* Profile Component */}
            {showProfile && (
                <div className="fixed inset-0 flex justify-center items-center z-50">
                    <EditProfile onClose={() => setShowProfile(false)} />
                </div>
            )}
        </div>
    );
};

export default HomePage;
