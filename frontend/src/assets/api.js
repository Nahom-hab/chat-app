// src/api.js
// Mock API function
export const fetchMessages = async (friendId) => {
    const messages = {
        1: [
            { text: 'Hello!', time: '10:00 AM', isSentByCurrentUser: true },
            { text: 'Hi, how are you?', time: '10:01 AM', isSentByCurrentUser: false },
            { text: 'Hello!', time: '10:00 AM', isSentByCurrentUser: true },
            { text: 'Hi, how are you?', time: '10:01 AM', isSentByCurrentUser: false },
            { text: 'Hello!', time: '10:00 AM', isSentByCurrentUser: true },
            { text: 'Hi, how are you?', time: '10:01 AM', isSentByCurrentUser: false },
            { text: 'Hello!', time: '10:00 AM', isSentByCurrentUser: true },
            { text: 'Hi, how are you?', time: '10:01 AM', isSentByCurrentUser: false },
            { text: 'Hello!', time: '10:00 AM', isSentByCurrentUser: true },
            { text: 'Hi, how are you?', time: '10:01 AM', isSentByCurrentUser: false },
            { text: 'Hello!', time: '10:00 AM', isSentByCurrentUser: true },
            { text: 'Hi, how are you?', time: '10:01 AM', isSentByCurrentUser: false },
            { text: 'Hello!', time: '10:00 AM', isSentByCurrentUser: true },
            { text: 'Hi, how are you?', time: '10:01 AM', isSentByCurrentUser: false },
            { text: 'Hello!', time: '10:00 AM', isSentByCurrentUser: true },
            { text: 'Hi, how are you?', time: '10:01 AM', isSentByCurrentUser: false },
        ],
        2: [
            { text: 'Hello!', time: '10:00 AM', isSentByCurrentUser: true },
            { text: 'Hi, how are you?', time: '10:01 AM', isSentByCurrentUser: false }, { text: 'Hello!', time: '10:00 AM', isSentByCurrentUser: true },
            { text: 'Hi, how are you?', time: '10:01 AM', isSentByCurrentUser: false },
        ],
    };

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(messages[friendId] || []);
        }, 500);
    });
};
