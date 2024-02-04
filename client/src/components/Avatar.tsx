import styled from "styled-components";

export default function Avatar({
  name
}: {
  name: string
}) {

  const split = name.split(' ');
  const len = split.length;
  const initials = [split[0].charAt(0), (len > 1) ? split[len - 1].charAt(0) : ""]
    .join('').toUpperCase();

  return <Container>
    <span>{initials}</span>
  </Container>
}

const Container = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: #3498db;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 24px;
  font-weight: bold;
  overflow: hidden;
`