/*function generateBank() {
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
}*/
