import React, { useState, useEffect } from 'react';
import SearchBar from '../components/searchbar';
import MainSidebar from '../components/sidebar';
import SideBarFriends from '../components/SideBarFriends';
import SendMessage from '../components/sendMessage';
import Messages from '../components/message';
import SearchedUsers from '../components/searchedUsers';
import MessageHeader from '../components/MessageHeader'

const HomePage = () => {
    const [friends, setFriends] = useState(null)
    const [messages, setMessages] = useState([]);
    const [selectedFriendID, setSelectedFriendID] = useState('')
    const [searchTerm, setSearchTerm] = useState('')
    const [searchedUsers, setSearchedUsers] = useState(null)
    const [inputmessage, setinputmessage] = useState('')
    useEffect(() => {
        const getFriends = async () => {
            try {
                const res = await fetch('/api/user/getFriends');
                const data = await res.json()
                setFriends(data)
            } catch (error) {
                console.log(error);
            }
        }
        getFriends()

    }, [])
    useEffect(() => {
        if (selectedFriendID) {
            const getMessages = async () => {
                const res = await fetch(`/api/message/${selectedFriendID}`);
                const data = await res.json()
                if (data) {
                    setMessages(data);
                } else {
                    setMessages([])
                }
            };
            getMessages();
        }
    }, [selectedFriendID]);

    const handleChange = (e) => {
        setSearchTerm(e.target.value)
        handleSearch(searchTerm)
    }
    const handleSearch = async (term) => {
        if (term) {
            try {
                const res = await fetch(`/api/user/search?searchTerm=${term}`);
                const data = await res.json()
                setSearchedUsers(data)
                console.log(data);
            } catch (error) {
                console.log(error);

            }
        }
    };

    const handleInput = (e) => {
        setinputmessage(e.target.value);
    };

    const handleSend = async () => {
        try {
            const res = await fetch(`/api/message/send/${selectedFriendID}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: inputmessage }), // Wrap inputmessage in an object
            });

            if (!res.ok) {
                throw new Error('Failed to send message');
            }
            const data = await res.json();

            setinputmessage('');
            setMessages(prevMessages => [...prevMessages, data]);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
            {/* Sidebar */}
            <div className="w-[28.5%] flex-row bg-gray-200 dark:bg-gray-800 flex-shrink-0 flex">
                <MainSidebar />
                <div className="mt-4">
                    <SearchBar
                        handleChange={handleChange}
                        value={searchTerm}
                    />
                    {searchTerm !== '' ? <SearchedUsers
                        setSelectedFriendID={setSelectedFriendID}
                        searchedUsers={searchedUsers}
                        setSearchTerm={setSearchTerm}
                    /> : <SideBarFriends
                        friends={friends}
                        setSelectedFriendID={setSelectedFriendID}
                        SelectedFriendID={selectedFriendID}
                    />}

                </div>
            </div>

            {/* Chat Area */}

            <div className="flex-1 flex flex-col ml-2 p-2 bg-gray-100 dark:bg-gray-900">
                <MessageHeader
                    selectedFriendID={selectedFriendID}
                    friends={friends} />
                <div className="flex-1 w-full overflow-y-auto bg-gray-200 dark:bg-gray-800 p-4 rounded-lg flex flex-col scrollbar-dark dark:scrollbar-dark scrollbar-light">
                    <Messages messages={messages} />
                    <SendMessage
                        value={inputmessage}
                        handleSend={handleSend}
                        handleInput={handleInput}
                    />
                </div>
            </div>
        </div>
    );
};

export default HomePage;

