import styled from "styled-components";
import { User } from "../types/User.types";
import Logout from "./Logout";

export default function Welcome({
  currentUser
}: {
  currentUser: User
}) {
  return (
    <Container>
      <div className="logout"><Logout /></div>
      <h1>Welcome, <span>{currentUser.username}</span> </h1>
      <h3>Select a chat from the left.</h3>
    </Container>
  )
}

const Container = styled.div`
position: relative;
display: flex;
justify-content: center;
align-items: center;
flex-flow: column;
color: white;
span {
  color: #e6ff00;
}

.logout {
  position: absolute;
  right: 5%;
  top: 5%;
}
`;