const fs = require('fs');

function readInput() {
  try {
    const data = fs.readFileSync('/Users/rosstinsley/Documents/Personal/Advent-of-Code/2021/input/Day_4.txt', 'utf8');
    return data.split('\n');
  } catch (error) {
    console.error(error);
  }
}

class Board {
  constructor(raw) {
    this.raw = raw;
    this.boardArray = [];
    this.formatInput();
  }

  formatInput() {
    this.raw.trim().split("\n").forEach(row => {
      let rowArray = [];

      row.split(" ").forEach(val => {
        if (val.length > 0) {
          rowArray.push({
            'value': parseInt(val),
            'marked': false
          })
        }
      });

      this.boardArray.push(rowArray);

    });
  }

  getUnmarked() {
    let unmarked = [];
    this.boardArray.forEach(row => {
      row.forEach(val => {
        if (!val.marked) unmarked.push(val);
      });
    });

    return unmarked;
  }

  checkWon(row, col) {
    const rowWin = this.boardArray[row].reduce((acc, v) => {
      if (v.marked && acc) return true;
      return false;
    }, true);

    const colWin = this.boardArray.map(row => row[col]).reduce((acc, v) => {
      if (v.marked && acc) return true;
      return false;
    }, true);

    return rowWin || colWin;
  }

  mark(x) {
    let hasWon = false;
    this.boardArray.forEach((row, r) => {
      row.forEach((val, c) => {
        if (!val.marked && val.value === x) {
          val.marked = true;
          if (this.checkWon(r, c)) hasWon = true;
        }
      });
    });
    return hasWon;
  }

  calculateScore(last) {
    const sum = this.getUnmarked().map(v => v.value).reduce((acc, v) => acc + v, 0);
    if (last === 13) console.log(sum);
    return sum * last;
  }
}

function buildBoards(input) {
  let boards = [];
  let builderBoard = "";
  for (let i = 1; i < input.length; i++) {
    if (input[i].length === 0) {
      // Empty space before a board
      if (builderBoard.length > 0) {
        boards.push(new Board(builderBoard));
      }
      builderBoard = "";
    }
    builderBoard += input[i] + "\n";
  }
  // Last board
  if (builderBoard.length > 0) {
    boards.push(new Board(builderBoard));
  }
  return boards;
}

const fullInput = readInput();
const randomNumbers = fullInput[0].split(',').map(Number);

function findFirstWinningBoardScore(boards) {
  for (let i = 0; i < randomNumbers.length; i++) {
    const num = randomNumbers[i];
    for (let b = 0; b < boards.length; b++) {
      const board = boards[b];
      const hasWon = board.mark(num);
      if (hasWon) {
        return board.calculateScore(num);
      }
    }
  }
}

function findLastWinningBoardScore(boards) {
  let winners = [];
  for (let i = 0; i < randomNumbers.length; i++) {
    const num = randomNumbers[i];
    for (let b = 0; b < boards.length; b++) {
      const board = boards[b];
      const hasWon = board.mark(num);
      if (hasWon && !winners.includes(b)) {
        winners.push(b)
      }

      if (winners.length === boards.length) {
        return board.calculateScore(num);
      }
    }
  }
}

const score = findFirstWinningBoardScore(buildBoards(fullInput));
console.log("Part 1:", score);
const lastScore = findLastWinningBoardScore(buildBoards(fullInput));
console.log("Part 2:", lastScore);