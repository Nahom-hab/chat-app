import { create } from 'zustand'

const useConversation = create((set) => ({
    SelectedFriend: null,
    setSelectedFriend: (SelectedFriend) => set({ SelectedFriend }),
    messages: [],
    setMessages: (messages) => set({ messages }),
    AuthUser: JSON.parse(localStorage.getItem("chat-user")),

    setAuthUser: (AuthUser) => set({ AuthUser }),
}))

export default useConversation
