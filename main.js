const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;


const SYMBOLS_COUNT = {
    A: 2,
    B: 6,
    C: 4,
    D: 8
}
const SYMBOLS_VALUES = {
    A: 5,
    B: 4,
    C: 3,
    D: 2
}

const deposit = () => {
    while (true) {
        const depositAmount = prompt("Enter a deposit amount: ")
        const numberDepositAmnt = parseFloat(depositAmount);
        if (isNaN(numberDepositAmnt) || numberDepositAmnt <= 0) {
            console.log("Please...check your Deposit...Try again...!");
        }
        else {
            return numberDepositAmnt;
        }
    }
};

const getNumberOfLines = () => {

    while (true) {
        const lines = prompt("Enter number of lines to be bet on (1 - 3 ) ")
        const numberOfLines = parseFloat(lines);
        if (isNaN(numberOfLines) || numberOfLines > 3 || numberOfLines <= 0) {
            console.log("Please...check your number of lines..Try again...!");
        }
        else {
            return numberOfLines;
        }
    }
};
const getBet = (balance, lines) => {
    while (true) {
        const bet = prompt("Enter number of bet per line ")
        const numberBet = parseFloat(bet);

        if (isNaN(numberBet) || numberBet > (balance / lines) || numberBet <= 0) {
            console.log("Invalid bet.....You only have "+ balance );
        }
        else {
            return numberBet;
        }
    }
};

const spin = () => {
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
        for (i = 0; i < count; i++) {
            symbols.push(symbol);
        }
    }

    const reels = [];
    for (let i = 0; i < COLS; i++) {
        reels.push([]);
        const reelSymbols = [...symbols];
        for (let j = 0; j < ROWS; j++) {
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
            const selectedSymbols = reelSymbols[randomIndex];
            reels[i].push(selectedSymbols);
            reelSymbols.splice(randomIndex, 1);
        }
    }
    return reels;
};
const transpose = (reels) => {
    const rows = [];
    for (let i = 0; i < ROWS; i++) {
        rows.push([]);
        for (let j = 0; j < COLS; j++) {
            rows[i].push(reels[j][i])
        }
    }
    return rows;
};

const printRows = (rows) => {
    for (const row of rows) {
        let rowString = "";
        for (const [i, symbol] of row.entries()) {
            rowString += symbol
            if (i != row.length - 1) {
                rowString += " | "
            }
        }
        console.log(rowString);
    }
};

const getWinnings = (rows, bet, lines) => {
    let winnings = 0;
    for (let row = 0; row < lines; row++) {
        const symbols = rows[row];
        let allsame = true;
        for (const symbol of symbols) {
            if (symbol != symbols[0]) {
                allsame = false;
                break;
            }
        }
        if (allsame) {
            winnings += bet * SYMBOLS_VALUES[symbols[0]];
        }
    }
    return winnings;
};

const game = () => {
    let balance = deposit();
    // console.log("You Have balance of $" + balance);
    while (true) {
        console.log("You Have balance of $" + balance);
        const numberOfLines = getNumberOfLines();
        // console.log(numberOfLines);
        const bet = getBet(balance, numberOfLines);
        balance -= bet * numberOfLines;
        const reels = spin();
        const rows = transpose(reels);
        // console.log(reels);
        // console.log(rows);
        printRows(rows);
        const winnings = getWinnings(rows, bet, numberOfLines)
        balance += winnings;
        console.log("You won $" + winnings.toString())
        // console.log("You Have balance of $" + balance);
        if (balance <= 0) {
            console.log("You ran out of balance !");
            break;
        }
        const playAgain = prompt("Do you wanna Play Again (y/n) ");
        if (playAgain != 'y'){
            break;
        }
    }
};
game();

