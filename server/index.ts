import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { Player } from "../types/Player";
import { Lobby } from "../types/Lobby";
import SPACES from "./defaultValues/SPACES";
import CHANCECARDS from "./defaultValues/CHANCECARDS";
import deepClone from "deep-clone";
import { ChanceCard } from "../types/ChanceCard";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const SPACE_COUNT = 40;

const LOBBIES: Lobby[] = [];

function createLobbyCode() {
  const alphabet = "ACDEFGHJKLMNPQRSTUVWXYZ2345679";
  let result = "";
  for (let i = 0; i < 3; i++) {
    result += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
  }
  if (
    !(
      LOBBIES.find((lobby) => {
        return lobby.code === result;
      }) === undefined
    )
  ) {
    createLobbyCode();
  }
  return result;
}

function movePlayer(lobby: Lobby, player: Player, amount: number) {
  const originalSpace = player.currentSpace;
  player.currentSpace = (player.currentSpace + amount) % SPACE_COUNT;

  const passedStart = player.currentSpace < originalSpace;
  if (passedStart) {
    payPlayer(lobby, player, 200);
  }

  io.to(lobby.code).emit("updateLobby", lobby);
}

function performSpaceAction(lobby: Lobby, player: Player) {
  const space = lobby.spaces[player.currentSpace];
  if (space.type === "chance" || space.type === "wheel") {
    const card = drawChanceCard(lobby);
    doChanceAction(lobby, card, player);
    io.to(lobby.code).emit("drawChanceCard", card);
  } else if (space.type === "start") {
    payPlayer(lobby, player, 400);
  } else if (space.type === "goToJail") {
    player.currentSpace = 10;
    // gå til fengsel logikk her
  } /*else if (space.type === 'wheel') {
    }*/ else if (space.type === "tax") {
    reducePlayerBalance(lobby, player, space.price.tax);
  } else if (["property", "transport", "utility"].includes(space.type)) {
    if (space.ownerID !== "" && space.ownerID !== player.id) {
      const ownerOfSpace = lobby.players.find(
        (player) => player.id === space.ownerID
      );
      if (!ownerOfSpace) return;
      // player.money -= space.price.parking[space.houseCount];
      // ownerOfSpace.money += space.price.parking[space.houseCount];
    }
  }
}

function shuffleCards(cards: ChanceCard[]) {
  return cards.sort(() => Math.random() - 0.5);
}

function drawChanceCard(lobby: Lobby): ChanceCard {
  if (lobby.chanceCards.length === 0) {
    lobby.chanceCards = shuffleCards(deepClone(CHANCECARDS));
  }
  return lobby.chanceCards.pop()!;
}

function doChanceAction(lobby: Lobby, card: ChanceCard, player: Player) {
  switch (card.action.type) {
    case "receive":
      payPlayer(lobby, player, card.action.value);
      break;
    case "lose":
      reducePlayerBalance(lobby, player, card.action.value);
      break;
    case "move":
      const previousSpace = player.currentSpace;
      player.currentSpace = card.action.value;
      if (player.currentSpace < previousSpace) {
        payPlayer(lobby, player, 200);
      }
      break;
  }
}

function generateBank() {
  let bank: { value: string; ownerIndex: number }[][] = [[], [], [], []];
  for (let i = 0; i < 36; i++) {
    bank[0].push({ value: "ones", ownerIndex: -1 });
  }

  for (let i = 0; i < 36; i++) {
    bank[1].push({ value: "tens", ownerIndex: -1 });
  }

  for (let i = 0; i < 16; i++) {
    bank[2].push({ value: "hundreds", ownerIndex: -1 });
  }

  for (let i = 0; i < 40; i++) {
    bank[3].push({ value: "fivehundreds", ownerIndex: -1 });
  }
  return bank;
}

function calculateBillCounts(money: number) {
  const fiveHundreds = Math.floor(money / 500);
  const hundreds = Math.floor((money % 500) / 100);
  const tens = Math.floor((money % 100) / 10);
  const ones = Math.floor(money % 10);
  return [ones, tens, hundreds, fiveHundreds];
}

function payPlayer(
  lobby: Lobby,
  player: Player,
  amount: number,
  payingPlayer: Player | "bank" = "bank"
) {
  const bank = lobby.bank;
  const bankIsPaying = payingPlayer === "bank";
  const receiverIndex = lobby.players.indexOf(player);

  if (bankIsPaying) {
    const billCounts = calculateBillCounts(amount);
    for (const billCountIndex in billCounts) {
      const billCount = billCounts[billCountIndex];
      for (let i = 0; i < billCount; i++) {
        let availableBill: { value: string; ownerIndex: number } | undefined =
          undefined;
        for (let i = bank[billCountIndex].length - 1; i > 0; i--) {
          const bill = bank[billCountIndex][i];
          if (bill.ownerIndex === -1) {
            availableBill = bill;
            break;
          }
        }

        if (!availableBill) return;
        availableBill.ownerIndex = receiverIndex;
      }
    }
  } else {
    return;
  }
}

function reducePlayerBalance(lobby: Lobby, player: Player, amount: number) {
  const fiveHundredsCount = {
    value: 500,
    count: lobby.bank[3].filter((bill) => {
      return bill.ownerIndex === lobby.players.indexOf(player);
    }),
  };
  const hundredsCount = {
    value: 100,
    count: lobby.bank[2].filter((bill) => {
      return bill.ownerIndex === lobby.players.indexOf(player);
    }),
  };
  const tensCount = {
    value: 10,
    count: lobby.bank[1].filter((bill) => {
      return bill.ownerIndex === lobby.players.indexOf(player);
    }),
  };
  const onesCount = {
    value: 1,
    count: lobby.bank[0].filter((bill) => {
      return bill.ownerIndex === lobby.players.indexOf(player);
    }),
  };

  let total = 0;
  let billsToRemove = [0, 0, 0, 0];
  for (const count of [
    fiveHundredsCount,
    hundredsCount,
    tensCount,
    onesCount,
  ]) {
    for (let i = 0; i < count.count.length; ) {
      console.log(i);
      total += count.value;
      billsToRemove[
        [onesCount, tensCount, hundredsCount, fiveHundredsCount].indexOf(count)
      ] += 1;
      if (total > amount) {
        for (const billCountIndex in billsToRemove) {
          let billCount = billsToRemove[billCountIndex];
          for (let i = 0; i < billCount; i++) {
            const bankCurrency = lobby.bank[billCountIndex];
            if (bankCurrency.length > 0) {
              let j = bankCurrency.length - 1;
              while (billCount > 0 && j > 0) {
                console.log(j, bankCurrency[0].value);
                const bill = bankCurrency[j];
                if (bill.ownerIndex === lobby.players.indexOf(player)) {
                  bill.ownerIndex = -1;
                  billCount--;
                }
                j--;
              }
            }
          }
        }
        console.log("betaler ", total);
        console.log("får tilbake ", total - amount);
        payPlayer(lobby, player, total - amount);
        return;
      }
    }
  }
}

io.on("connection", (socket) => {
  console.log(socket.id.substring(0, 3) + " connected");
  io.to(socket.id).emit("navigateHome");

  let player: Player = {
    id: socket.id,
    color: "",
    currentSpace: 0,
    ownedSpaces: [],
    money: 1500,
  };

  let lobby: Lobby | undefined = undefined;

  socket.on("createLobby", () => {
    const lobby: Lobby = {
      code: createLobbyCode(),
      adminID: socket.id,
      availableColors: ["indianred", "deepskyblue", "khaki", "darkseagreen"],
      players: [],
      chat: [],
      diceState: [],
      currentPlayerIndex: -1,
      spaces: deepClone(SPACES),
      chanceCards: shuffleCards(deepClone(CHANCECARDS)),
      bank: generateBank(),
    };
    LOBBIES.push(lobby);

    io.to(socket.id).emit("lobbyCreated", lobby.code);
    console.log(
      socket.id.substring(0, 3) + " created lobby with code " + lobby.code
    );
  });

  socket.on("joinLobby", (code) => {
    lobby = LOBBIES.find((lobby) => {
      return lobby.code === code;
    });

    if (lobby) {
      socket.join(code);
      const color = lobby.availableColors.pop();
      if (color) player.color = color;

      lobby.players.push(player);
      io.to(socket.id).emit("lobbyJoined");

      lobby.chat.push({
        author: "",
        value: socket.id.substring(0, 3) + " joined the game!",
      });
      io.to(lobby.code).emit("updateChat", lobby.chat);

      console.log(socket.id.substring(0, 3) + " joined " + lobby.code);
    }
  });

  socket.on("lobbyPageEntered", () => {
    if (!lobby) {
      io.to(socket.id).emit("navigateHome");
    } else {
      io.to(lobby.code).emit("updateLobby", lobby);
    }
  });

  socket.on("loadChat", () => {
    if (lobby) io.to(socket.id).emit("updateChat", lobby.chat);
  });

  socket.on("sendChat", (message) => {
    if (lobby) {
      lobby.chat.push(message);
      io.to(lobby.code).emit("updateChat", lobby.chat);
    }
  });

  socket.on("startGame", () => {
    if (lobby) {
      lobby.currentPlayerIndex = Math.ceil(
        Math.random() * lobby.players.length - 1
      );
      for (const player of lobby.players) {
        payPlayer(lobby, player, 1500);
      }

      io.to(lobby.code).emit("gameStarted");

      lobby.chat.push({
        author: "",
        value: socket.id.substring(0, 3) + " started the game!",
      });
      io.to(lobby.code).emit("updateChat");
    }
  });

  socket.on("gamePageEntered", () => {
    if (!lobby) {
      io.to(socket.id).emit("navigateHome");
    } else {
      io.to(socket.id).emit("updateLobby", lobby);
    }
  });

  socket.on("throwDice", () => {
    if (!lobby) return;
    io.to(lobby.code).emit("diceThrown", {
      velocity: [
        Math.ceil(Math.random() * 10 - 5),
        Math.ceil(Math.random() * 10 - 5),
        Math.ceil(Math.random() * 10 - 5),
        Math.ceil(Math.random() * 10 - 5),
        Math.ceil(Math.random() * 10 - 5),
        Math.ceil(Math.random() * 10 - 5),
      ],
      rotation: [
        Math.random() * 2 * Math.PI,
        Math.random() * 2 * Math.PI,
        Math.random() * 2 * Math.PI,
        Math.random() * 2 * Math.PI,
        Math.random() * 2 * Math.PI,
        Math.random() * 2 * Math.PI,
      ],
      angularVelocity: [
        Math.ceil(Math.random() * 10 - 5),
        Math.ceil(Math.random() * 10 - 5),
        Math.ceil(Math.random() * 10 - 5),
        Math.ceil(Math.random() * 10 - 5),
        Math.ceil(Math.random() * 10 - 5),
        Math.ceil(Math.random() * 10 - 5),
      ],
    });
  });

  socket.on("emitDiceResult", (result) => {
    if (!lobby) return;
    if (lobby.players[lobby.currentPlayerIndex].id === socket.id) {
      lobby.diceState.push(result);
      if (lobby.diceState.length === 2) {
        console.log(
          socket.id.substring(0, 3) +
            " rolled a " +
            (lobby.diceState[0] + lobby.diceState[1])
        );

        movePlayer(
          lobby,
          lobby.players[lobby.currentPlayerIndex],
          lobby.diceState.reduce((a, b) => a + b, 0)
        );

        lobby.diceState = [];
      }
    }
  });

  socket.on("buyProperty", (space) => {
    if (!lobby) return;
    const boughtSpace = lobby.spaces.find(
      (otherSpace) => space.id === otherSpace.id
    );
    if (!boughtSpace) return;
    boughtSpace.ownerID = socket.id;
    reducePlayerBalance(lobby, player, boughtSpace.price.buy);
    io.to(lobby.code).emit("updateLobby", lobby);
  });

  socket.on("dismissChanceCard", () => {
    if (!lobby) return;
    io.to(lobby.code).emit("dismissChanceCard");
  });

  socket.on("endTurn", () => {
    if (!lobby) return;
    lobby.currentPlayerIndex =
      (lobby.currentPlayerIndex + 1) % lobby.players.length;
    io.to(lobby.code).emit("updateLobby", lobby);
  });

  socket.on("finishedMoving", () => {
    if (!lobby || socket.id != lobby.players[lobby.currentPlayerIndex].id)
      return;
    performSpaceAction(lobby, player);
    io.to(lobby.code).emit("updateLobby", lobby);
    io.to(player.id).emit("turnEndable");
  });

  socket.on("disconnect", () => {
    if (lobby) {
      const wasAdmin = player.id === lobby.adminID;

      lobby.availableColors.push(player.color);

      if (lobby.players[lobby.currentPlayerIndex].id === socket.id) {
        lobby.currentPlayerIndex =
          (lobby.currentPlayerIndex + 1) % (lobby.players.length - 1);
      }
      const remainingPlayers = (lobby.players = lobby.players.filter(
        (player) => {
          return player.id !== socket.id;
        }
      ));
      lobby.players = remainingPlayers;

      if (wasAdmin && lobby.players.length > 0)
        lobby.adminID = lobby.players[0].id;
      io.to(lobby.code).emit("updateLobby", lobby);

      lobby.chat.push({
        author: "",
        value: player.id.substring(0, 3) + " left the game...",
      });
      io.to(lobby.code).emit("updateChat", lobby.chat);

      socket.leave(lobby.code);
    }
    console.log(socket.id.substring(0, 3) + " disconnected");
  });
});

httpServer.listen(4949);
console.log("listening on port 4949");
