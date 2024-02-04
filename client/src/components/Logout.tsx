import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function Logout() {

  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.removeItem("chat-app-user")

    navigate("/login")
  }
  return <Button onClick={handleLogout}><LogOut /> Logout</Button>
}

const Button = styled.button`
display: flex;
align-items: center;
gap: 0.5rem;
`