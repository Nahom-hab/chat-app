import useConversation from "../zustand/useConversationStore";

export default function MessageHeader() {
    const { SelectedFriend } = useConversation()

    if (!SelectedFriend) {
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
                src={SelectedFriend.profilePic}
                alt={SelectedFriend.full_name}
                className="w-10 h-10 rounded-full mr-2"
            />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {SelectedFriend.username}
            </h2>
        </div>
    );
}
