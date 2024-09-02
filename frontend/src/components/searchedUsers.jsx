import React from 'react';
import useConversation from '../zustand/useConversationStore';

export default function SearchedUsers({ setSearchTerm, searchedUsers }) {
    const { SelectedFriend, setSelectedFriend } = useConversation()


    return (
        <div className='space-y-2 mt-4 overflow-y-auto max-h-[34rem] scrollbar-custom'>
            {searchedUsers !== null ? (
                searchedUsers.map((user) => (
                    <div onClick={() => {
                        setSelectedFriend(user)
                        setSearchTerm('')
                    }} className='flex items-center mb-3' key={user._id}>
                        <img src={user.profilePic} className='mr-2 rounded-full w-8 h-8 object-cover' alt={user.username} />
                        <div className='truncate'>{user.username}</div>
                    </div>
                ))
            ) : (
                <p>No users found.</p>
            )}
        </div>
    );
}
