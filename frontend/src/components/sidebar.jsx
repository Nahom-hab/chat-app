import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faInbox, faUserFriends, faUsers, faHashtag, faRobot } from '@fortawesome/free-solid-svg-icons';

export default function MainSidebar() {
    return (
        <div className="flex flex-col items-center pt-10 mr-10 bg-gray-300 dark:bg-gray-900 h-screen w-16 space-y-4">
            <FontAwesomeIcon icon={faBars} className="text-lg mb-10 dark:text-white text-slate-950" />
            <button className="flex flex-col items-center justify-center space-y-1 p-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700">
                <FontAwesomeIcon icon={faInbox} className="text-gray-600 text-lg dark:text-gray-300" />
                <span className="text-gray-900 text-xs dark:text-white">All Chats</span>
            </button>
            <button className="flex flex-col items-center justify-center space-y-1 p-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700">
                <FontAwesomeIcon icon={faHashtag} className="text-gray-600 text-lg dark:text-gray-300" />
                <span className="text-gray-900 text-xs dark:text-white">Channels</span>
            </button>
            <button className="flex flex-col items-center justify-center space-y-1 p-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700">
                <FontAwesomeIcon icon={faUsers} className="text-gray-600 text-lg dark:text-gray-300" />
                <span className="text-gray-900 text-xs dark:text-white">Groups</span>
            </button>
            <button className="flex flex-col items-center justify-center space-y-1 p-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700">
                <FontAwesomeIcon icon={faUserFriends} className="text-gray-600 text-lg dark:text-gray-300" />
                <span className="text-gray-900 text-xs dark:text-white">Friends</span>
            </button>
            <button className="flex flex-col items-center justify-center space-y-1 p-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700">
                <FontAwesomeIcon icon={faRobot} className="text-gray-600 text-lg dark:text-gray-300" />
                <span className="text-gray-900 text-xs dark:text-white">Bots</span>
            </button>
        </div>
    );
}
