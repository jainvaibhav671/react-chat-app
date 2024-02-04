import { useEffect, useRef } from "react";
import styled from "styled-components";
import { Message } from "../types/Message.types";

export default function Messages({
  messages
}: {
  messages: Message[]
}) {

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return <Container>
    {messages.map((msg, k) => {
      const cls = "message " + ((msg.fromSelf) ? "sender" : "receiver");
      return <div key={k} ref={scrollRef}>
        <div className={cls}>
          <div className="content">
            <p>{msg.message}</p>
          </div>
        </div>
      </div>
    })}
  </Container>
}

const Container = styled.div`
  padding: 1rem 2rem;
  display: flex;
  flex-flow: column;
  gap: 1rem;
  overflow: auto;

  .message {
    display: flex;
    align-items: center;
    .content {
      max-width: 40%;
      overflow-wrap: break-word;
      padding: 1rem;
      font-size: 1.1rem;
      border-radius: 1rem;
    }
  }
  .sender {
    justify-content: flex-end;
    .content {
      background-color: #4f04ff21;
    }
  }
  .receiver {
    justify-content: flex-start;
    .content {
      background-color: #f0f40021;
    }
  }

`