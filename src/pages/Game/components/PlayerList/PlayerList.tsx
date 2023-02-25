import styled, { css } from 'styled-components'
import { useLobby } from '../../../../context/LobbyContext'

export default function PlayerList()  {
    const {players} = useLobby()

    return <Container>
        {players.list.map(player => {
            return <Portrait className={player.id === players.current.id ? 'current' : ''}>
                <Cutoff>
                    <Piece color={player.color}/>
                </Cutoff>
                <PlayerInfo>
                    <b>{player.id.substring(0, 3)}</b>
                    <span>{player.money}M</span>
                </PlayerInfo>
            
            </Portrait>
        })}
    </Container>
}

const Container = styled.div`
    z-index: 1;
    position: absolute;
    right: 5px;
    display: flex;
    flex-direction: column;
    align-items: end;
    gap: 20px;
`

const PlayerInfo = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    text-align: right;
    right: 50px;
    bottom: 0px;
`

const Cutoff = styled.div`
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 150%;
    border-radius: 25px;
    overflow: hidden;
`

const Piece = styled("div")(
	({ color }) => css`
    position: absolute;
    bottom: 0px;
    right: 4px;
    transform: rotate(-18deg);
    width: 28px;
    height: 40px;
    background: ${color};
    transition: 0.75s;

    &::after {
        content: ' ';
        display: block;
        position: relative;
        top: -3px;
        width: 100%;
        height: 6px;
        background: ${color};
        filter: brightness(80%);
        border-radius: 50%;
    }
`)

const Portrait = styled.div`
    position: relative;
    width: 43px;
    height: 43px;
    border-radius: 50%;
    background: linear-gradient(-45deg, #999999 0%, #eeeeee 65%);
    opacity: 0.5;
    transition: 0.5s;

    &.current {
        width: 55px;
        height: 55px;
        opacity: 1;

        ${Piece} {
            height: 60px;
            width: 35px;
        }

        > ${PlayerInfo} {
            right: 62px;
        }
    }
`