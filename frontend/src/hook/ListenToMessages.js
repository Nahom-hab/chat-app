import React from 'react'
import { useSocketContext } from '../Context/socketContext'
import useConversation from '../zustand/useConversationStore'
import { useEffect } from 'react'

export default function ListenToMessages() {
    const { socket } = useSocketContext()
    const { messages, setMessages } = useConversation()

    useEffect(() => {
        socket?.on('newMessage', newmessage => {
            newmessage.shouldShake = true
            setMessages([...messages, newmessage])
        })
        return () => socket?.off('newMessage')

    }, [socket, messages, setMessages])
}
