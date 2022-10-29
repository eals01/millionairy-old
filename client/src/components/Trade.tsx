import styled from 'styled-components'

export default function Trade() {
  return (
    <TradeContainer>
      <h1>Trade</h1>
      <div>
        <div></div>
        <div></div>
      </div>
    </TradeContainer>
  )
}

const TradeContainer = styled.div`
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > div {
    width: 60%;
    height: 50%;
    display: flex;
    justify-content: space-around;
    align-items: center;

    > div {
      width: 45%;
      height: 90%;
      background: rgba(0, 0, 0, 0.4);
    }
  }
`
