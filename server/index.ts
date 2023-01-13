import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import deepClone from 'deep-clone'
import movePlayer from './functions/movePlayer'
import createLobbyCode from './functions/createLobbyCode'
import shuffleCards from './functions/shuffleCards'
import performSpaceAction from './functions/performSpaceAction'
import generateDiceValues from './functions/generateDiceValues'
import { Player } from '../types/Player'
import { Lobby } from '../types/Lobby'
import { Space } from '../types/Space'
import spaces from './defaultValues/spaces'
import chanceCards from './defaultValues/chanceCards'

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true
  }
})

const lobbies: Lobby[] = []

io.on('connection', socket => {
  console.log(socket.id.substring(0, 3) + ' connected')
  io.to(socket.id).emit('navigateHome')

  let player: Player = {
    id: socket.id,
    color: '',
    currentSpace: 0,
    previousSpace: 0,
    money: 0
  }

  let lobby: Lobby | undefined = undefined

  socket.on('createLobby', () => {
    const lobby: Lobby = {
      code: createLobbyCode(lobbies),
      adminID: socket.id,
      availableColors: ['indianred', 'deepskyblue', 'khaki', 'darkseagreen'],
      players: [],
      chat: [],
      diceState: [],
      currentPlayerIndex: -1,
      spaces: deepClone(spaces),
      chanceCards: shuffleCards(deepClone(chanceCards)),
      canThrowAgain: false,
      throwsInARow: 0
    }
    lobbies.push(lobby)

    io.to(socket.id).emit('lobbyCreated', lobby.code)
    console.log(socket.id.substring(0, 3) + ' created lobby with code ' + lobby.code)
  })

  socket.on('joinLobby', code => {
    lobby = lobbies.find(lobby => {
      return lobby.code === code
    })

    if (lobby) {
      socket.join(code)
      const color = lobby.availableColors.pop()
      if (color) player.color = color

      lobby.players.push(player)
      io.to(socket.id).emit('lobbyJoined')

      lobby.chat.push({
        author: '',
        value: socket.id.substring(0, 3) + ' joined the game!'
      })
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
      let i = 0
      for (const player of lobby.players) {
        player.money += 1499
        lobby.spaces[0].playersOnSpace[i] = player
        i++
      }

      io.to(lobby.code).emit('gameStarted')

      lobby.chat.push({
        author: '',
        value: socket.id.substring(0, 3) + ' started the game!'
      })
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
    io.to(lobby.code).emit('diceThrown', generateDiceValues())
  })

  socket.on('emitDiceResult', result => {
    if (!lobby) return
    if (lobby.players[lobby.currentPlayerIndex].id === socket.id) {
      lobby.diceState.push(result)
      if (lobby.diceState.length === 2) {
        console.log(
          socket.id.substring(0, 3) + ' rolled a ' + (lobby.diceState[0] + lobby.diceState[1])
        )

        movePlayer(
          lobby,
          lobby.players[lobby.currentPlayerIndex],
          lobby.diceState.reduce((a, b) => a + b, 0)
        )
        io.to(lobby.code).emit('movePiece', lobby)
        lobby.canThrowAgain = lobby.diceState[0] === lobby.diceState[1]

        lobby.diceState = []
      }
    }
  })

  socket.on('buyProperty', (space: Space) => {
    if (!lobby) return
    const boughtSpace = lobby.spaces.find(otherSpace => space.id === otherSpace.id)
    if (!boughtSpace) return
    boughtSpace.ownerID = socket.id
    player.money -= space.price.buy
    io.to(lobby.code).emit('updateLobby', lobby)
  })

  socket.on('dismissChanceCard', () => {
    if (!lobby) return
    io.to(lobby.code).emit('dismissChanceCard')
  })

  socket.on('endTurn', () => {
    if (!lobby) return
    lobby.currentPlayerIndex = (lobby.currentPlayerIndex + 1) % lobby.players.length
    io.to(lobby.code).emit('turnEnded', lobby)
  })

  socket.on('finishedMoving', () => {
    if (!lobby || socket.id != lobby.players[lobby.currentPlayerIndex].id) return
    performSpaceAction(io, lobby, player)

    if (lobby.canThrowAgain) {
      lobby.throwsInARow += 1
    } else {
      lobby.throwsInARow = 0
      io.to(player.id).emit('turnEndable')
    }
  })

  socket.on('displayPropertyCard', () => {
    if (!lobby) return
    io.to(lobby.code).emit('propertyCardDisplayed')
  })

  socket.on('declinePurchase', () => {
    if (!lobby) return
    io.to(lobby.code).emit('purchaseDeclined')
  })

  socket.on('disconnect', () => {
    if (lobby) {
      const wasAdmin = player.id === lobby.adminID

      lobby.availableColors.push(player.color)

      const playersOnSpace = lobby.spaces[player.currentSpace].playersOnSpace

      let indexOnSpace = -1
      playersOnSpace.find((space, index) => {
        indexOnSpace = index
        return space !== null && space.id === player.id
      })
      playersOnSpace[indexOnSpace] = null

      if (lobby.players[lobby.currentPlayerIndex]?.id === socket.id) {
        lobby.currentPlayerIndex = (lobby.currentPlayerIndex + 1) % (lobby.players.length - 1)
      }
      const remainingPlayers = (lobby.players = lobby.players.filter(player => {
        return player.id !== socket.id
      }))
      lobby.players = remainingPlayers

      if (wasAdmin && lobby.players.length > 0) lobby.adminID = lobby.players[0].id
      io.to(lobby.code).emit('updateLobby', lobby)

      for (const space of lobby.spaces) {
        if (space.ownerID === socket.id) {
          space.ownerID = ''
        }
      }

      lobby.chat.push({
        author: '',
        value: player.id.substring(0, 3) + ' left the game...'
      })
      io.to(lobby.code).emit('updateChat', lobby.chat)

      socket.leave(lobby.code)
    }
    console.log(socket.id.substring(0, 3) + ' disconnected')
  })
})

httpServer.listen(4949)
console.log('listening on port 4949')
