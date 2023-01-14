import { useEffect, useState } from 'react'
import styled from 'styled-components'
import socket from '../socket'
import { Message } from '../types/Message'

export default function Chat() {
  const [chat, setChat] = useState<Message[]>([])
  const [input, setInput] = useState('')

  useEffect(() => {
    socket.emit('loadChat')

    socket.on('updateChat', (chat) => {
      setChat(chat)
    })

    return () => {
      socket.off('updateChat')
    }
  }, [])

  function handleKeyDown(event: { key: string }) {
    if (event.key === 'Enter') {
      sendChat()
    }
  }

  function sendChat() {
    if (input.length > 0) {
      socket.emit('sendChat', {
        author: socket.id.substring(0, 3),
        value: input,
      })
      setInput('')
    }
  }

  return (
    <Container>
      <MessageContainer>
        {chat.map((message, index) =>
          message.author === '' ? (
            <ChatMessage key={index}>
              <Alert>{message.value}</Alert>
            </ChatMessage>
          ) : (
            <ChatMessage key={index}>
              <Author>{message.author}</Author>
              <Value>{message.value}</Value>
            </ChatMessage>
          )
        )}
      </MessageContainer>
      <Input
        value={input}
        onChange={(event) => setInput(event.target.value)}
        onKeyDown={handleKeyDown}
      />
    </Container>
  )
}

export const Container = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 600px;
  height: 300px;
  border: 1px solid black;
  background: white;
`

const MessageContainer = styled.div`
  width: 100%;
  height: calc(100% - 2em);
  overflow-y: scroll;
`

const ChatMessage = styled.div`
  height: 2em;
  line-height: 2em;

  &:nth-child(even) {
    background: whitesmoke;
  }
`

const Alert = styled.span`
  color: grey;
`

const Author = styled.span`
  font-weight: bold;
  margin-right: 0.25em;
`

const Value = styled.span``

const Input = styled.input`
  position: absolute;
  bottom: 0;
  box-sizing: border-box;
  width: 100%;
  height: 2em;
  border: none;

  border-top: 1px solid black;
  font-size: 16px;

  &:focus {
    outline: none;
  }
`
