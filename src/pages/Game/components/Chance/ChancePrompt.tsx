import { useEffect, useState } from 'react'
import styled from 'styled-components'
import socket from '../../../../socket'

export default function ChanceCard({ yourTurn }: { yourTurn: boolean }) {
  const [text, setText] = useState('')
  const [active, setActive] = useState(false)

  useEffect(() => {
    socket.on('drawChanceCard', (card) => {
      setText(card.text)
      setActive(true)
    })

    socket.on('dismissChanceCard', () => {
      setText('')
      setActive(false)
    })

    return () => {
      socket.off('drawChanceCard')
      socket.off('dismissChanceCard')
    }
  }, [])

  function dismissPrompt() {
    socket.emit('dismissChanceCard')
  }

  if (!active) return <></>
  return (
    <ChanceCardContainer>
      <div>
        <span>?</span>
        <h3>Chance</h3>
        <p>{text}</p>
        {yourTurn && <button onClick={dismissPrompt}>Dismiss</button>}
      </div>
    </ChanceCardContainer>
  )
}

const ChanceCardContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  > div {
    z-index: -2;
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1em;
    overflow: hidden;

    > span {
      position: absolute;
      z-index: -1;
      font-size: 100px;
      color: pink;
    }
  }
`
