import { create } from 'zustand'

const useDarkmode = create((set) => ({
    darkmode: true,
    setSelectedFriend: (SelectedFriend) => set({ SelectedFriend }),
    messages: [],
    setMessages: (messages) => set({ messages }),
    AuthUser: JSON.parse(localStorage.getItem("chat-user")),

    setAuthUser: (AuthUser) => set({ AuthUser }),
}))

export default useDarkmode
