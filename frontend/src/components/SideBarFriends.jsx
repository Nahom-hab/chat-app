
export default function SideBarFriends({ SelectedFriendID, friends, setSelectedFriendID }) {
    return (
        <ul className="space-y-2 mt-4 overflow-y-auto max-h-[34rem] scrollbar-light dark:scrollbar-dark">
            {friends?.map((friend) => (
                <li
                    className={` ${SelectedFriendID === friend._id ? 'bg-slate-100 dark:bg-slate-900' : ''} flex w-72  items-center cursor-pointer p-2 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-md`}
                    onClick={() => setSelectedFriendID(friend._id)}
                    key={friend._id}
                >
                    <img
                        src={friend.profilePic}
                        alt={friend.full_name}
                        className="w-12 h-12 rounded-full mr-2"
                    />
                    <span className="text-gray-900 dark:text-white">{friend.full_name}</span>
                </li>
            ))}
        </ul>

    )
}
