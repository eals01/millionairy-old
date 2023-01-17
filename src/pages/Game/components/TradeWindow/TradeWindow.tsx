import styled from "styled-components"
import { useLobby } from "../../../../context/LobbyContext"
import socket from "../../../../socket"

import arrow from './arrow.svg'

export default function TradeWindow() {
    const { spaces, trade } = useLobby()

    function cancelTrade() {
        socket.emit('cancelTrade')
    }

    return <Container>
        <div className='player'>
            <h2>{trade.leftPlayer.id.substring(0, 3)}</h2>
            <div className='propertyIcons'>
                {[...Array(10)].map((_, index) => {
                    return (<div>
                        {spaces.map((space) => {
                            if (space.column === index) {
                                return <div style={{ background: space.color }} className="propertyIcon" />
                            }
                        })}
                    </div>)
                })}
            </div>
            <p>{trade.leftPlayer.money} $</p>
            <input type='range' />
        </div>
        <div className='center'>
            <div>
                <input type='checkbox' />
                <span>Ready</span>
            </div>
            <div className='leftToRight'>
                <img src={arrow} />
                <div className='content'>
                    <div className='propertyIcons'>
                        {[...Array(10)].map((_, index) => {
                            return (<div>
                                {spaces.map((space) => {
                                    if (space.column === index) {
                                        return <div className="propertyIcon" />
                                    }
                                })}
                            </div>)
                        })}
                    </div>
                    <span>0 $</span>
                </div>
            </div>
            <div className='rightToLeft'>
                <img src={arrow} />
                <div className='content'>
                    <div className='propertyIcons'>
                        {[...Array(10)].map((_, index) => {
                            return (<div>
                                {spaces.map((space) => {
                                    if (space.column === index) {
                                        return <div className="propertyIcon" />
                                    }
                                })}
                            </div>)
                        })}
                    </div>
                    <span>0 $</span>
                </div>
            </div>
            <div>
                <input type='checkbox' />
                <span>Ready</span>
            </div>
        </div>
        <div className='player'>
            <h2>{trade.rightPlayer.id.substring(0, 3)}</h2>
            <div className='propertyIcons'>
                {[...Array(10)].map((_, index) => {
                    return (<div>
                        {spaces.map((space) => {
                            if (space.column === index) {
                                return <div style={{ background: space.color }} className="propertyIcon" />
                            }
                        })}
                    </div>)
                })}
            </div>
            <p>{trade.rightPlayer.money} $</p>
            <input type='range' />
        </div>
        <button onClick={cancelTrade} className='cancelButton'>Cancel trade</button>
    </Container>
}

const Container = styled.div`
    display: flex;
    justify-content: space-between;

    position: absolute;
    z-index: 1;
    
    width: 90%;
    height: 85%;
    background: white;
    border: 1px solid black;

    .propertyIcons {
        display: flex;
        gap: 2px;

        > div {
            display: flex;
            flex-direction: column;
            gap: 2px;
        }
    }

    .propertyIcon {
        width: 10px;
        height: 10px;
        background: #f5f5f5;
    }

    .center {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 10px;

        width: 30%;
        background: #eeeeee;
    }

    .content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;

        height: 80%;
    }

    .leftToRight {
        position: relative;

        display: flex;
        align-items: center;
        justify-content: center;

        width: 90%;
        height: 40%;
        border: 1px solid lightgrey;

        > img {
            position: absolute;
            width: 60%;
            opacity: 0.05;
        }
    }

    .rightToLeft {
        position: relative;

        display: flex;
        align-items: center;
        justify-content: center;

        width: 90%;
        height: 40%;
        border: 1px solid lightgrey;

        > img {
            position: absolute;
            width: 60%;
            opacity: 0.05;
            transform: rotate(180deg)
        }
    }

    .player {
        display: flex;
        flex-grow: 1;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .cancelButton {
        position: absolute;
        bottom: -25px;
        right: 0px;
        
        height: 25px;
        border: 1px solid black;
        background: #ee2222;
        color: white;
    }
`