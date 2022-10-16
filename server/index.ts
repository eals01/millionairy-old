import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { Player } from '../types/Player'
import { Lobby } from '../types/Lobby'

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true
  }
})

const SPACE_COUNT = 40

const LOBBIES: Lobby[] = []

function createLobbyCode() {
  const alphabet = 'ACDEFGHJKLMNPQRSTUVWXYZ2345679'
  let result = ''
  for (let i = 0; i < 3; i++) {
    result += alphabet.charAt(Math.floor(Math.random() * alphabet.length))
  }
  if (
    !(
      LOBBIES.find(lobby => {
        return lobby.code === result
      }) === undefined
    )
  ) {
    createLobbyCode()
  }
  return result
}

io.on('connection', socket => {
  console.log(socket.id.substring(0, 3) + ' connected')

  let player: Player = {
    id: socket.id,
    currentSpace: 0,
    color: ''
  }

  let lobby: Lobby | undefined = undefined

  socket.on('createLobby', () => {
    const lobby = {
      code: createLobbyCode(),
      adminID: socket.id,
      availableColors: ['red', 'blue', 'yellow', 'green'],
      players: [],
      chat: [],
      diceState: [],
      currentPlayerIndex: -1
    }
    LOBBIES.push(lobby)

    io.to(socket.id).emit('lobbyCreated', lobby.code)
    console.log(socket.id.substring(0, 3) + ' created lobby with code ' + lobby.code)
  })

  socket.on('joinLobby', code => {
    lobby = LOBBIES.find(lobby => {
      return lobby.code === code
    })

    if (lobby) {
      socket.join(code)
      const color = lobby.availableColors.pop()
      if (color) player.color = color

      lobby.players.push(player)
      io.to(socket.id).emit('lobbyJoined')

      lobby.chat.push({ author: '', value: socket.id.substring(0, 3) + ' joined the game!' })
      io.to(lobby.code).emit('updateChat', lobby.chat)

      console.log(socket.id.substring(0, 3) + ' joined ' + lobby.code)
    }
  })

  socket.on('lobbyPageEntered', () => {
    if (!lobby) {
      io.to(socket.id).emit('navigateHome')
    } else {
      io.to(lobby.code).emit('updateLobby', lobby)
    }
  })

  socket.on('loadChat', () => {
    if (lobby) io.to(socket.id).emit('updateChat', lobby.chat)
  })

  socket.on('sendChat', message => {
    if (lobby) {
      lobby.chat.push(message)
      io.to(lobby.code).emit('updateChat', lobby.chat)
    }
  })

  socket.on('startGame', () => {
    if (lobby) {
      lobby.currentPlayerIndex = Math.ceil(Math.random() * lobby.players.length - 1)

      io.to(lobby.code).emit('gameStarted')

      lobby.chat.push({ author: '', value: socket.id.substring(0, 3) + ' started the game!' })
      io.to(lobby.code).emit('updateChat')
    }
  })

  socket.on('gamePageEntered', () => {
    if (!lobby) {
      io.to(socket.id).emit('navigateHome')
    } else {
      io.to(socket.id).emit('updateLobby', lobby)
    }
  })

  socket.on('throwDice', () => {
    if (!lobby) return
    io.to(lobby.code).emit('diceThrown', {
      velocity: [
        Math.ceil(Math.random() * 10 - 5),
        Math.ceil(Math.random() * 10 - 5),
        Math.ceil(Math.random() * 10 - 5),
        Math.ceil(Math.random() * 10 - 5),
        Math.ceil(Math.random() * 10 - 5),
        Math.ceil(Math.random() * 10 - 5)
      ],
      rotation: [
        Math.random() * 2 * Math.PI,
        Math.random() * 2 * Math.PI,
        Math.random() * 2 * Math.PI,
        Math.random() * 2 * Math.PI,
        Math.random() * 2 * Math.PI,
        Math.random() * 2 * Math.PI
      ],
      angularVelocity: [
        Math.ceil(Math.random() * 10 - 5),
        Math.ceil(Math.random() * 10 - 5),
        Math.ceil(Math.random() * 10 - 5),
        Math.ceil(Math.random() * 10 - 5),
        Math.ceil(Math.random() * 10 - 5),
        Math.ceil(Math.random() * 10 - 5)
      ]
    })
  })

  socket.on('emitDiceResult', result => {
    if (!lobby) return
    if (lobby.players[lobby.currentPlayerIndex].id === socket.id) {
      lobby.diceState.push(result)
      if (lobby.diceState.length === 2) {
        lobby.players[lobby.currentPlayerIndex].currentSpace =
          (lobby.players[lobby.currentPlayerIndex].currentSpace +
            lobby.diceState.reduce((a, b) => a + b, 0)) %
          SPACE_COUNT

        console.log(
          socket.id.substring(0, 3) + ' rolled a ' + (lobby.diceState[0] + lobby.diceState[1])
        )
        lobby.diceState = []
        setTimeout(() => {
          if (lobby) {
            lobby.currentPlayerIndex = (lobby.currentPlayerIndex + 1) % lobby.players.length
            io.to(lobby.code).emit('updateLobby', lobby)
          }
        }, 500)
      }
    }
  })

  socket.on('disconnect', () => {
    if (lobby) {
      const wasAdmin = player.id === lobby.adminID

      lobby.availableColors.push(player.color)

      const remainingPlayers = (lobby.players = lobby.players.filter(player => {
        return player.id !== socket.id
      }))
      lobby.players = remainingPlayers

      if (wasAdmin && lobby.players.length > 0) lobby.adminID = lobby.players[0].id
      io.to(lobby.code).emit('updateLobby', lobby)

      lobby.chat.push({ author: '', value: player.id.substring(0, 3) + ' left the game...' })
      io.to(lobby.code).emit('updateChat', lobby.chat)

      socket.leave(lobby.code)
    }
    console.log(socket.id.substring(0, 3) + ' disconnected')
  })
})

httpServer.listen(4000)
console.log('listening on port 4000')
