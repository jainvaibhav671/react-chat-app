import axios from 'axios'
import { useEffect, useState } from 'react'
import { Socket } from 'socket.io-client'
import styled from 'styled-components'
import { getMessagesRoute, sendMessageRoute } from '../lib/api_routes'
import { Message } from '../types/Message.types'
import { User } from '../types/User.types'
import Avatar from './Avatar'
import ChatInput from './ChatInput'
import Logout from './Logout'
import Messages from './Messages'

export default function ChatContainer({
  currentChat,
  currentUser,
  socket,
}: {
  currentChat: User
  currentUser: User
  socket: Socket | undefined
}) {
  const [msgs, setMsgs] = useState<Message[]>([])
  const [arrivalMessage, setArrivalMessage] = useState<Message | null>(null)

  useEffect(() => {
    socket?.on('msg-receive', (msg) => {
      console.log(msg)
      setArrivalMessage({ fromSelf: false, message: msg })
    })
  }, [socket])

  useEffect(() => {
    arrivalMessage && setMsgs((prev) => [...prev, arrivalMessage])
  }, [arrivalMessage])

  useEffect(() => {
    async function func() {
      const res = await axios.post(getMessagesRoute, {
        from: currentUser._id,
        to: currentChat._id,
      })
      setMsgs(res.data)
    }
    func()
  }, [currentChat._id, currentUser._id])

  const handleSendMsg = async (msg: string) => {
    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    })

    socket?.emit('send-msg', {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    })

    const messages = [...msgs]
    messages.push({ fromSelf: true, message: msg })
    setMsgs(messages)
  }

  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <Avatar name={currentChat.username} />
          <div className="username">
            <h3>{currentChat.username}</h3>
          </div>
        </div>
        <Logout />
      </div>

      <Messages messages={msgs} />
      <ChatInput handleSendMsg={handleSendMsg} />
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  padding-top: 1rem;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-height: 720px) and (max-height: 1080px) {
    grid-auto-rows: 13% 75% 12%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;

    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
`
