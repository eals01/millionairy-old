import { useEffect, useState } from 'react'
import styled from 'styled-components'
import socket from '../../../../socket'

export default function ChanceCard({
  currentPlayer,
}: {
  currentPlayer: boolean
}) {
  const [text, setText] = useState('')
  const [active, setActive] = useState(false)

  useEffect(() => {
    socket.on('drawChanceCard', (card) => {
      setText(card.text)
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

  useEffect(() => {
    if (text === '') return
    setActive(true)
  }, [text])

  function dismiss() {
    socket.emit('dismissChanceCard')
  }

  if (!active) return <></>
  return (
    <ChanceCardContainer>
      <div>
        <h3>Chance</h3>
        <p>{text}</p>
        {currentPlayer && <button onClick={dismiss}>Dismiss</button>}
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
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1em;
  }
`
