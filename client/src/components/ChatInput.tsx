import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { Laugh, SendHorizontal } from "lucide-react";
import { ChangeEvent, FormEvent, KeyboardEvent, useState } from "react";
import styled from "styled-components";

export default function ChatInput({
  handleSendMsg
}: {
  handleSendMsg: (msg: string) => void
}) {

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");

  const sendChat = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (msg.length > 0) {
      handleSendMsg(msg)
      setMsg('')
    }
  }

  const hidePicker = () => {
    setShowEmojiPicker(false);
  }

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker)
  }

  const handleClick = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.code === "Escape") {
      hidePicker()
    }
  }

  const handleEmojiClick = (e: EmojiClickData) => {
    setMsg(msg + e.emoji)
  }

  const msgOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMsg(e.target.value);
  }


  return <Container>
    <div className="btn-container">
      <div onKeyDown={handleClick} onClick={toggleEmojiPicker} className="emoji">
        <Laugh color="#ffff00c8" fontSize={1.5} cursor="pointer" />
        {showEmojiPicker && <EmojiPicker onEmojiClick={handleEmojiClick} />}
      </div>
    </div>
    <form className="input-container" onSubmit={sendChat}>
      <input value={msg} onChange={msgOnChange} type="text" placeholder="Message..." />
      <button type="submit">
        <SendHorizontal />
      </button>
    </form>
  </Container>
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 5% 95%;
  align-items: center;
  padding: 0 2rem;
  padding-bottom: 0.3rem;

  .btn-container {
    display: flex;
    align-items: center;
    gap: 1rem;
    .emoji {
      position: relative;
      display: flex;
      flex-flow: column;
      justify-content: center;
    }
    .EmojiPickerReact {
      position: absolute;
      bottom: 30px;
    }
  }

  .input-container {
    width: 100%;
    display: flex;
    align-content: center;
    gap: 1rem;
    input {
      width: 90%;
      height: 60%;
      border-bottom: 1px solid;
      font-size: 1.2rem;
    }
  }
`