import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { isReturnStatement } from 'typescript'
import { Message } from '../../../types/Message'
import socket from '../socket'

export default function Chat() {
  const [chat, setChat] = useState<Message[]>([])
  const [firstLoad, setFirstLoad] = useState(true)
  const [input, setInput] = useState('')

  const messageContainerRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    socket.emit('loadChat')

    socket.on('updateChat', (chat) => {
      setChat(chat)
    })

    return () => {
      socket.off('updateChat')
    }
  }, [])

  useEffect(() => {
    if (!messageContainerRef.current) return
    const firstTimeScrollbarInitiated =
      messageContainerRef.current.scrollHeight -
        messageContainerRef.current.clientHeight <
      32
    const scrolledToBottom =
      messageContainerRef.current.scrollTop +
        messageContainerRef.current.clientHeight ===
      messageContainerRef.current.scrollHeight - 32
    const distanceToBottom =
      messageContainerRef.current.scrollHeight -
      messageContainerRef.current.clientHeight

    if (firstLoad && chat.length > 0) {
      messageContainerRef.current.scrollBy(0, distanceToBottom)
      setFirstLoad(false)
    }
    if (firstTimeScrollbarInitiated) {
      messageContainerRef.current.scrollBy(0, distanceToBottom)
    }
    if (scrolledToBottom) {
      messageContainerRef.current.scrollBy(0, distanceToBottom)
    }
  }, [chat])

  const inputRef = useRef<HTMLInputElement>(null)

  function handleKeyDown(event: { key: string }) {
    if (event.key === 'Enter') {
      sendChat()
    }
  }

  function sendChat() {
    if (input.length > 0) {
      socket.emit('sendChat', {
        author: socket.id.substring(0, 5),
        value: input,
      })
      setInput('')
      if (messageContainerRef.current) {
        messageContainerRef.current.scrollBy(
          0,
          messageContainerRef.current.scrollHeight -
            messageContainerRef.current.clientHeight
        )
      }
    }
  }

  return (
    <ChatContainer>
      <MessageContainer ref={messageContainerRef}>
        {chat.map((message) =>
          message.author === '' ? (
            <ChatMessage>
              <Alert>{message.value}</Alert>
            </ChatMessage>
          ) : (
            <ChatMessage>
              <Author>{message.author}</Author>
              <Value>{message.value}</Value>
            </ChatMessage>
          )
        )}
      </MessageContainer>
      <Input
        ref={inputRef}
        value={input}
        onChange={(event) => setInput(event.target.value)}
        onKeyDown={handleKeyDown}
      />
    </ChatContainer>
  )
}

export const ChatContainer = styled.div`
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
