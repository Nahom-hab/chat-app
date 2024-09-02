import { useSocketContext } from "../Context/socketContext"
import useConversation from "../zustand/useConversationStore"

export default function SideBarFriends({ friends }) {
    const { SelectedFriend, setSelectedFriend } = useConversation()
    const { onlineUsers } = useSocketContext()
    return (
        <ul className="space-y-2 mt-4 overflow-y-auto max-h-[34rem] scrollbar-light dark:scrollbar-dark">
            {friends?.map((friend) => (
                <li
                    className={` ${SelectedFriend?._id === friend._id ? 'bg-slate-100 dark:bg-slate-900' : ''} flex w-72  items-center cursor-pointer p-2 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-md`}
                    onClick={() => setSelectedFriend(friend)}
                    key={friend._id}
                >
                    <img
                        src={friend.profilePic}
                        alt={friend.full_name}
                        className="w-9 h-9 rounded-full mr-2"
                    />
                    <div>{onlineUsers.includes(friend._id) ? 'online' : 'offline'} </div>
                    <span className="text-gray-900 dark:text-white">{friend.full_name.length < 10 ? friend.full_name : (`${friend.full_name.slice(0, 10)}...`)}</span>
                </li>
            ))}
        </ul>

    )
}
