import { useEffect, useState } from "react"
import deepClone from "deep-clone"
import styled from "styled-components"
import { useLobby } from "../../../../context/LobbyContext"
import socket from "../../../../socket"
import { defaultSpace, Space } from "../../../../types/Space"

import house from './house.svg'
import hotel from './hotel.svg'

export default function ManagePropertiesWindow() {
    const { spaces, players } = useLobby()
    const [clickedSpace, setClickedSpace] = useState<Space>(deepClone(defaultSpace))
    const [displayedSpace, setDisplayedSpace] = useState<Space>(deepClone(defaultSpace))

    useEffect(() => {
        const ownedSpaces = spaces.filter((space) => space.ownerID === players.current.id)
        const firstOwnedSpace = ownedSpaces.length > 0 && ownedSpaces[0]
        if (firstOwnedSpace) {
            setClickedSpace(firstOwnedSpace)
            setDisplayedSpace(firstOwnedSpace)
        }
    }, [])

    function cancelManageProperties() {
        socket.emit('cancelManageProperties')
    }

    function mortgage() {
        socket.emit('mortgage', displayedSpace.id)
    }

    function payMortgage() {
        socket.emit('payMortgage', displayedSpace.id)
    }

    function sellHouse() {
        socket.emit('sellHouse', displayedSpace)
    }

    function purchaseHouse() {
        socket.emit('purchaseHouse', displayedSpace)
    }

    return <Container>
        <div className='select'>
            <div className='propertyIcons'>
                {[...Array(10)].map((_, index) => {
                    return (<div>
                        {spaces.map((space) => {
                            const owned = space.ownerID === players.current.id
                            if (space.column === index) {
                                return <div
                                    onMouseOver={() => {
                                        if (owned) setDisplayedSpace(space)
                                    }}
                                    onMouseOut={() => {
                                        if (owned) setDisplayedSpace(clickedSpace)
                                    }}
                                    onClick={() => {
                                        if (owned) setClickedSpace(space)
                                    }}
                                    className={`propertyIcon ${owned ? 'owned' : 'unowned'} ${space === displayedSpace && 'selected'}`}
                                >
                                    <div className='color' style={{ background: space.color }} />
                                    <span>{space.houseCount}</span>
                                    <img src={house} />
                                    {space.mortgaged && <div className='mortgageCross'><span>X</span></div>}
                                </div>
                            }
                        })}
                    </div>)
                })}
            </div>
        </div>
        <div className='display'>
            <div className='propertyCard'>
                <div className='color' style={{ background: displayedSpace.color }} />
                <h3>{displayedSpace.name}</h3>
                <table>
                    <tbody>
                        <tr>
                            <td>Rent</td>
                            <td>{displayedSpace.price.parking[0]}</td>
                        </tr>
                        <tr>
                            <td>1 house</td>
                            <td>{displayedSpace.price.parking[1]}</td>
                        </tr>
                        <tr>
                            <td>2 houses</td>
                            <td>{displayedSpace.price.parking[2]}</td>
                        </tr>
                        <tr>
                            <td>3 houses</td>
                            <td>{displayedSpace.price.parking[3]}</td>
                        </tr>
                        <tr>
                            <td>4 houses</td>
                            <td>{displayedSpace.price.parking[4]}</td>
                        </tr>
                        <tr>
                            <td>Hotel</td>
                            <td>{displayedSpace.price.parking[5]}</td>
                        </tr>
                    </tbody>
                </table>
                {displayedSpace.type === 'property' && <p>House and hotel cost: {displayedSpace.price.house}</p>}
                <p>Mortgage amount: {displayedSpace.price.purchase / 2}</p>
                {displayedSpace.mortgaged && <div className='mortgageCross'><span>X</span></div>}
            </div>
            <div className='buttons'>
                {!displayedSpace.mortgaged ? <button onClick={mortgage}>Mortgage</button> : <button onClick={payMortgage}>Pay mortgage</button>}
                {displayedSpace.type === 'property' && <div>
                    <button onClick={sellHouse}>-</button>
                    <span>{displayedSpace.houseCount}</span>
                    <img src={house} />
                    <button onClick={purchaseHouse}>+</button>
                </div>}
            </div>
        </div>
        <button onClick={cancelManageProperties} className='cancelButton'>Stop managing</button>
    </Container>
}

const Container = styled.div`
    position: absolute;
    z-index: 1;

    display: flex;

    width: 90%;
    height: 50%;
    background: white;
    border: 1px solid black;

    .select {
        display: flex;
        justify-content: center;
        align-items: center;

        width: 50%;
        height: 100%;
        background: #dddddd;

        .propertyIcons {
            display: flex;
            gap: 8px;

            > div {
                display: flex;
                flex-direction: column;
                gap: 8px;

                > .propertyIcon {
                    position: relative;

                    width: 25px;
                    height: 40px;
                    background: white;

                    > .color {
                        width: 100%;
                        height: 8px;
                    }

                    > span {
                        position: absolute;
                        bottom: 2px;
                        left: 4px;

                        font-size: 12px;
                        color: green;
                    }

                    > img {
                        position: absolute;
                        bottom: 2px;
                        right: 2px;

                        width: 50%;
                    }

                    > .mortgageCross {
                        display: flex;
                        justify-content: center;
                        align-items: center;

                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: #ffdddd90;
                        overflow: hidden;

                        > span {
                            position: absolute;
                            font-weight: bold;
                            font-size: 60px;    
                            color: #ff777750;
                        }
                    }
                }

                > .owned {
                    cursor: pointer;
                }

                > .unowned {
                    opacity: 0.2;
                }

                > .selected {
                    box-sizing: border-box;
                    border: 1px solid black;
                }
            }
        }
    }

    .display {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        width: 50%;
        height: 100%;

        > .propertyCard {
            display: flex;
            flex-direction: column;
            align-items: center;

            position: relative;
            height: 90%;
            aspect-ratio: 9 / 16;

            border: 1px solid black;

            .color {
                content: ' ';
                display: block;
                width: 100%;
                height: 60px;
                border-bottom: 1px solid black;
            }

             > table > tbody > tr {
                width: 100%;
            }

            > table > tbody > tr > td {
                width: 50%;
                &:nth-child(2) {
                text-align: right;
                }
            }

            .mortgageCross {
                display: flex;
                justify-content: center;
                align-items: center;

                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: #ffdddd90;
                overflow: hidden;

                > span {
                    position: absolute;
                    font-weight: bold;
                    font-size: 800px;    
                    color: #ff777750;
                }
            }            
        }

        .buttons {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 50%;

            span {
                color: green;
                font-weight: bold;
            }

            img {
                height: 24px;
            }

            > div {
                display: flex;
                align-items: center;
            }
        }
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