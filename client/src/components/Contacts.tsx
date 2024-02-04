import { useEffect, useState } from "react";
import styled from "styled-components";
import logo from "../assets/react.svg";
import { User } from "../types/User.types";
import Avatar from "./Avatar";

export default function Contacts({
  contacts,
  currentUser,
  changeChat
}: {
  contacts: User[]
  currentUser: User | null
  changeChat: (chat: User) => void
}) {

  const [currentUserName, setCurrentUserName] = useState<string | undefined>(undefined)
  const [currentSelected, setCurrentSelected] = useState<number | undefined>(undefined)

  useEffect(() => {
    if (currentUser) {
      setCurrentUserName(currentUser.username)
    }
  }, [currentUser])

  const changeCurrentChat = (index: number, contact: User) => {
    setCurrentSelected(index)
    changeChat(contact);
  }

  return <>
    {currentUserName && (
      <Container>
        <div className="brand">
          <img src={logo} alt="Logo" />
          <h3>Snappy</h3>
        </div>
        <div className="contacts">
          {contacts.map((c, k) => {
            const cls = "contact " + ((k === currentSelected) ? "selected" : "")
            return <div onClick={() => changeCurrentChat(k, c)} key={k} className={cls}>
              <Avatar name={c.username} />
              <div className="username"><h3>{c.username}</h3></div>
            </div>
          })}
        </div>
        <div className="current-user">
          <div className="username"><h1>{currentUserName}</h1></div>
        </div>
      </Container>
    )}
  </>
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080420;

  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    img { height: 2rem; }
    h3 { color: white; text-transform: uppercase; }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff39;
      min-height: 4rem;
      width: 90%;
      cursor: pointer;
      border-radius: 0.2rem;
      padding: 0.4rem;
      gap: 1rem;
      align-items: center;
      display: flex;
      transition: 0.5s ease-in-out;
      .username {
        h3 { color: white; }
      }
    }
    .selected {
      background-color: #9186f3;
    }
  }
  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .username {
      h2 { color: white; }
    }
  }

  @media screen and (min-width: 720px) and (max-width: 1080px) {
    gap: 0.5rem;
    .username { h2 { font-size: 1rem } }
  }
`;