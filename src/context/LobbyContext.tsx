import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import socket from '../socket'
import { defaultLobby, Lobby } from '../types/Lobby'

const LobbyContext = createContext<Lobby>(defaultLobby)

export const useLobby = () => useContext(LobbyContext)

export const LobbyContextProvider = ({ children }: { children: ReactNode }) => {
    const navigate = useNavigate()
    const [lobby, setLobby] = useState(defaultLobby)

    useEffect(() => {
        socket.on('navigateHome', () => {
            navigate('/')
        })

        socket.on('updateLobby', lobby => {
            setLobby(lobby)
        })

        socket.on('lobbyCreated', lobby => {
            setLobby(lobby)
            socket.emit('joinLobby', lobby.code)
        })

        socket.on('lobbyJoined', lobby => {
            setLobby(lobby)
            navigate('./lobby')
        })

        socket.on('gameStarted', lobby => {
            setLobby(lobby)
            navigate('/game')
        })

        return () => {
            socket.off('navigateHome')
            socket.off('updateLobby')
            socket.off('lobbyCreated')
            socket.off('lobbyJoined')
            socket.off('gameStarted')
        }
    }, [])

    return (
        <LobbyContext.Provider value={lobby}>
            {children}
        </LobbyContext.Provider>
    )
}

