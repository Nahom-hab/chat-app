import React from 'react'
import { useSocketContext } from '../Context/socketContext'
import useConversation from '../zustand/useConversationStore'
import { useEffect } from 'react'
import NotficationSound from '../assets/sounds/notification.mp3'

export default function ListenToMessages() {
    const { socket } = useSocketContext()
    const { messages, setMessages, SelectedFriend } = useConversation()

    useEffect(() => {
        socket?.on('newMessage', newmessage => {
            newmessage.shouldShake = true
            const sound = new Audio(NotficationSound)
            sound.play()
            if (newmessage.senderID === SelectedFriend._id) {
                setMessages([...messages, newmessage])
            }
        }
        )
        return () => socket?.off('newMessage')

    }, [socket, messages, setMessages])
}
