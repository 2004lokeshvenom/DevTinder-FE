import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { createSocketConnection } from '../Utils/socket'
import { useSelector } from 'react-redux'
import BASE_URL from '../Utils/constants'
import axios from 'axios'

const Chat = () => {
  const { targetUserId } = useParams()
  const [newMessage, setNewMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [othersName, setOthersName] = useState('')
  const [otherPhoto, setOtherPhoto] = useState('')

  const socketRef = useRef(null)

  const user = useSelector((state) => state.user)
  const connections = useSelector((state) => state.connection)

  const userId = user?.data?._id?.toString()
  const myName = `${user?.data?.firstName || ''} ${user?.data?.lastName || ''}`.trim()
  const myPhoto = user?.data?.photoUrl

  const fetchChatMessages = async () => {
    if (!targetUserId) return
    try {
      const res = await axios.get(`${BASE_URL}/chat/${targetUserId}`, {
        withCredentials: true,
      })

      const msgs = res?.data?.messages || []

      const chatMessages = msgs.map((m) => {
        const senderIdStr = m.senderId ? m.senderId.toString() : undefined
        const sender = senderIdStr === userId ? 'me' : 'other'
        return {
          _id: m._id,
          text: m.text,
          sender,
          senderPhoto: m.senderPhoto || null,
          createdAt: m.createdAt,
        }
      })

      setMessages(chatMessages)
    } catch (err) {
      console.error('Error fetching chat messages:', err?.message || err)
    }
  }

  useEffect(() => {
    fetchChatMessages()
  }, [targetUserId])

  useEffect(() => {
    if (!connections || !Array.isArray(connections)) return
    const conn = connections.find((c) => c._id === targetUserId)
    if (conn) {
      setOtherPhoto(conn.photoUrl || null)
      setOthersName(`${conn.firstName || ''} ${conn.lastName || ''}`.trim())
    }
  }, [connections, targetUserId])

  useEffect(() => {
    if (!userId || !targetUserId) return

    const socket = createSocketConnection()
    socketRef.current = socket

    socket.emit('joinRoom', { myName, userId, targetUserId })

    const handler = (payload) => {
      if (!payload || !payload.text) return

      const senderId = payload.senderId?.toString() || payload.userId?.toString()
      const sender = senderId === userId ? 'me' : 'other'

      setMessages((prev) => [
        ...prev,
        {
          _id: payload._id || Date.now().toString(),
          text: payload.text,
          sender,
          senderPhoto: payload.senderPhoto || (sender === 'me' ? myPhoto : otherPhoto),
          createdAt: payload.createdAt || new Date().toISOString(),
        },
      ])
    }

    socket.on('receiveMessages', handler)

    return () => {
      socket.off('receiveMessages', handler)
      socket.disconnect()
    }
  }, [userId, targetUserId, myName, myPhoto, otherPhoto])

  const sendMessage = () => {
    if (!newMessage.trim()) return

    if (!socketRef.current) {
      console.error('Socket not connected')
      return
    }

    socketRef.current.emit('sendMessages', {
      userId,
      myName,
      myPhoto,
      targetUserId,
      text: newMessage,
    })

    setNewMessage('')
  }

  return (
    <div className="flex flex-col h-[70vh] border border-gray-700 m-5 rounded-lg">
      <h1 className="p-5 border-b border-gray-600 text-xl font-semibold">Chat</h1>

      <div className="flex-1 overflow-y-scroll p-5 space-y-5">
        {messages.map((msg) => (
          <div key={msg._id ?? Math.random()} className={`chat ${msg.sender === 'me' ? 'chat-end' : 'chat-start'}`}>
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="profile"
                  src={
                    msg.sender === 'me'
                      ? msg.senderPhoto || myPhoto || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAdAfaOIwWKxOsmQ54IvUovtzIo7z-VNCPjQ&s'
                      : msg.senderPhoto ||
                        otherPhoto ||
                        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAdAfaOIwWKxOsmQ54IvUovtzIo7z-VNCPjQ&s'
                  }
                />
              </div>
            </div>

            <div className="chat-header">
              {msg.sender === 'me' ? 'You' : othersName || 'Other'}
              <time className="text-xs opacity-50 ml-2">{msg.createdAt ? new Date(msg.createdAt).toLocaleTimeString() : ''}</time>
            </div>

            <div className="chat-bubble">{msg.text}</div>
            <div className="chat-footer opacity-50">{msg.sender === 'me' ? 'Delivered' : ''}</div>
          </div>
        ))}
      </div>

      <div className="p-5 border-t border-gray-600 flex gap-3">
        <input
          className="flex-1 border border-gray-400 px-3 py-2 rounded-md"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              sendMessage()
            }
          }}
        />
        <button onClick={sendMessage} className="px-5 py-2 bg-blue-600 text-white rounded-md">
          Send
        </button>
      </div>
    </div>
  )
}

export default Chat
