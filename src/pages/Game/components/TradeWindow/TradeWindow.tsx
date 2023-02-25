import { useEffect, useState } from 'react'
import styled from "styled-components"
import { useLobby } from "../../../../context/LobbyContext"
import socket from "../../../../socket"
import { Space } from '../../../../types/Space'

import arrow from './arrow.svg'

export default function TradeWindow() {
    const { spaces, trade } = useLobby()
    console.log(trade)

    const [leftInputValue, setLeftInputValue] = useState(0)
    const [rightInputValue, setRightInputValue] = useState(0)

    const [leftReady, setLeftReady] = useState(false)
    const [rightReady, setRightReady] = useState(false)

    useEffect(() => {
        setLeftInputValue(trade.left.money)
        setRightInputValue(trade.right.money)
    }, [trade.left.money, trade.right.money])

    function handleChangeLeft(event: React.ChangeEvent<HTMLInputElement>) {
        setLeftInputValue(parseInt(event.target.value))
    }

    function handleMouseUpLeft() {
        socket.emit('updateMoneyLeft', leftInputValue)
        socket.emit('leftNotReady')
        socket.emit('rightNotReady')
    }

    function handleChangeRight(event: React.ChangeEvent<HTMLInputElement>) {
        setRightInputValue(parseInt(event.target.value))
    }

    function handleMouseUpRight() {
        socket.emit('updateMoneyRight', rightInputValue)
        socket.emit('leftNotReady')
        socket.emit('rightNotReady')
    }

    function addToTrade(space: Space) {
        if(space.ownerID === socket.id) {
            socket.emit('addToTrade', space)
            socket.emit('leftNotReady')
            socket.emit('rightNotReady')
        }
    }

    function removeFromTrade(space: Space) {
        if(space.ownerID === socket.id) {
            socket.emit('removeFromTrade', space)   
            socket.emit('leftNotReady')
            socket.emit('rightNotReady')
        }
    }

    function handleCheckLeft() {
        if(leftReady) {
            socket.emit('leftNotReady')
        } else {
            socket.emit('leftReady')
        }
        setLeftReady(!leftReady)
    }

    function handleCheckRight() {
        if(rightReady) {
            socket.emit('rightNotReady')
        } else {
            socket.emit('rightReady')
        }
        setRightReady(!rightReady)
    }

    function performTrade() {
        socket.emit('performTrade')
    }

    function cancelTrade() {
        socket.emit('cancelTrade')
    }

    return <Container>
        <div className='player'>
            <h2>{trade.left.player.id.substring(0, 3)}</h2>
            <div className='propertyIcons'>
                {[...Array(10)].map((_, index) => {
                    return (<div>
                        {spaces.map((space) => {
                            if (space.column === index) {
                                return <div 
                                    style={space.ownerID === trade.left.player.id ? { background: space.color }: {}} 
                                    className={`propertyIcon ${space.ownerID === trade.left.player.id ? "owned" : "unowned"}`} 
                                    onClick={() => {
                                        if(!trade.left.ready) {
                                            addToTrade(space)
                                        }
                                    }}
                                >
                                    {trade.left.properties.filter((property) => property.id === space.id).length === 1 && 
                                        <span onClick={(event) => {
                                            if(!trade.left.ready) {
                                                event.stopPropagation()
                                                removeFromTrade(space)
                                            }
                                        }}>
                                            X
                                        </span>
                                    }
                                </div>
                            }
                        })}
                    </div>)
                })}
            </div>
            <p>{trade.left.player.money - leftInputValue}M</p>
            <input 
                disabled={trade.left.player.id !== socket.id || trade.left.ready}
                type='range' 
                min={0} 
                max={trade.left.player.money} 
                step={10} 
                value={leftInputValue}
                onChange={handleChangeLeft}
                onMouseUp={handleMouseUpLeft}
            />
        </div>
        <div className='center'>
            <div>
                <input 
                    type='checkbox' 
                    disabled={trade.left.player.id !== socket.id}
                    checked={trade.left.ready}
                    onChange={handleCheckLeft}
                />
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
                                        return <div 
                                            className="propertyIcon" 
                                            style={trade.left.properties.filter((property) => property.id === space.id).length === 1 ? {
                                                background: space.color
                                            } : {}}
                                            onClick={() => {
                                                if(!trade.left.ready) {
                                                    removeFromTrade(space)
                                                }
                                            }}
                                        />
                                    }
                                })}
                            </div>)
                        })}
                    </div>
                    <span>{trade.left.player.id === socket.id ? leftInputValue : trade.left.money}M</span>
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
                                        return <div 
                                            className="propertyIcon" 
                                            style={trade.right.properties.filter((property) => property.id === space.id).length === 1 ? {
                                                background: space.color
                                            } : {}}
                                            onClick={() => {
                                                if(!trade.left.ready) {
                                                    removeFromTrade(space)
                                                }
                                            }}
                                        />
                                    }
                                })}
                            </div>)
                        })}
                    </div>
                    <span>{trade.right.player.id === socket.id ? rightInputValue : trade.right.money}M</span>
                </div>
            </div>
            <div>
                <input 
                    type='checkbox' 
                    disabled={trade.right.player.id !== socket.id}
                    checked={trade.right.ready}
                    onChange={handleCheckRight}
                />
                <span>Ready</span>
            </div>
        </div>
        <div className='player'>
            <h2>{trade.right.player.id.substring(0, 3)}</h2>
            <div className='propertyIcons'>
                {[...Array(10)].map((_, index) => {
                    return (<div>
                        {spaces.map((space) => {
                            if (space.column === index) {
                                return <div 
                                    style={space.ownerID === trade.right.player.id ? { background: space.color }: {}} 
                                    className={`propertyIcon ${space.ownerID === trade.right.player.id ? "owned" : "unowned"}`} 
                                    onClick={() => {addToTrade(space)}}
                                >
                                    {trade.right.properties.filter((property) => property.id === space.id).length === 1 && 
                                        <span onClick={(event) => {
                                            if(!trade.left.ready) {
                                                event.stopPropagation()
                                                removeFromTrade(space)
                                            }
                                        }}>
                                            X
                                        </span>
                                    }
                                </div>
                            }
                        })}
                    </div>)
                })}
            </div>
            <p>{trade.right.player.money - rightInputValue}M</p>
            <input 
                disabled={trade.right.player.id !== socket.id || trade.right.ready}
                type='range' 
                min={0} 
                max={trade.right.player.money} 
                step={10} 
                value={rightInputValue}
                onChange={handleChangeRight}
                onMouseUp={handleMouseUpRight}
            />
        </div>
        {socket.id === trade.left.player.id &&
            <button 
                onClick={performTrade} 
                disabled={!(trade.left.ready && trade.right.ready)} 
                className='tradeButton'>Trade
            </button>
        }
        {(trade.left.player.id === socket.id || trade.right.player.id === socket.id) && 
            <button onClick={cancelTrade} className='cancelButton'>Cancel trade</button>
        }
        
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

        > .unowned {
           background: lightgrey;
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

    .tradeButton {
        position: absolute;
        bottom: -25px;

        height: 25px;
        border: 1px solid black;
    }

    .cancelButton {
        position: absolute;
        bottom: -25px;
        right: 0px;
        
        height: 25px;
        border: 1px solid black;
    }
`