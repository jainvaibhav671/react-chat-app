import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Socket, io } from "socket.io-client";
import styled from "styled-components";
import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import { allUsersRoute, host } from "../lib/api_routes";
import { User } from "../types/User.types";



export default function Chat() {

  const socket = useRef<Socket | undefined>(undefined);

  const [contacts, setContacts] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentChat, setCurrentChat] = useState<User | undefined>(undefined)

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host)
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser])

  useEffect(() => {
    async function func() {
      const currUser = localStorage.getItem("chat-app-user")
      if (!currUser) {
        navigate("/login")
      } else {
        const user = JSON.parse(currUser)
        setCurrentUser(user)
        const data = await axios.get(`${allUsersRoute}/${user._id}`);
        setContacts(data.data)

      }
    }
    func()
  }, [navigate])

  const handleChatChange = (chat: User) => {
    setCurrentChat(chat);
  }

  return (
    <Container>
      {currentUser
        ? <div className="container">
          <Contacts 
            changeChat={handleChatChange}
            contacts={contacts}
            currentUser={currentUser}
          />

          {(currentChat === undefined)
            ? <Welcome currentUser={currentUser} />
            : <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket.current} />}
        </div>
        : "Loading..."}
    </Container>
  )
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-flow: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;

  .container {
    height: 85%;
    background-color: #00000076;
    width: 85%;
    display: grid;
    grid-template-columns: 25% 75%;

    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`
