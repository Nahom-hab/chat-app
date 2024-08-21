import { useEffect, useState } from "react";

export default function MessageHeader({ selectedFriendID }) {
    const [selectedFriend, setSelectedfriend] = useState(null);

    useEffect(() => {
        // Check if selectedFriendID is not null or undefined before making the API call
        if (selectedFriendID) {
            const getUser = async () => {
                try {
                    const response = await fetch(`/api/user/${selectedFriendID}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch user');
                    }
                    const newuser = await response.json();
                    setSelectedfriend(newuser);
                    console.log(newuser);
                } catch (error) {
                    console.log(error);
                }
            };
            getUser();
        }
    }, [selectedFriendID]);

    if (!selectedFriend) {
        return (
            <div className="flex items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Select a friend to view their profile.
                </h2>
            </div>
        );
    }

    return (
        <div className="flex items-center mb-4">
            <img
                src={selectedFriend.profilePic}
                alt={selectedFriend.full_name}
                className="w-10 h-10 rounded-full mr-2"
            />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {selectedFriend.username}
            </h2>
        </div>
    );
}
