import { readDataArray } from './DataReader.js';

const data = readDataArray(4);

function getWinningNumbers(line: string): number[] {
  return line
    .split(':')[1]
    .split('|')[0]
    .trim()
    .split(' ')
    .map((val) => parseInt(val));
}

function getCardNumbers(line: string): number[] {
  return line
    .split(':')[1]
    .split('|')[1]
    .trim()
    .split(' ')
    .filter((v) => v.length > 0)
    .map((val) => parseInt(val.trim()));
}

function getCardId(line: string): number {
  const match = Array.from(line.split(':')[0].match(/\d+/g))[0];
  return parseInt(match);
}

function calculateWinningNumbers(winning: number[], card: number[]): number[] {
  return card.filter((n) => winning.includes(n));
}

function part1() {
  const matches = data.map((line) => {
    const winning = getWinningNumbers(line);
    const card = getCardNumbers(line);

    const winningNumbers = calculateWinningNumbers(winning, card);
    if (winningNumbers.length === 0) {
      return 0;
    }
    return Math.pow(2, winningNumbers.length - 1);
  });

  return matches.reduce((acc, c) => acc + c);
}

function part2() {
  const scratchcards = [...data];
  let total = 0;

  while (scratchcards.length > 0) {
    const card = scratchcards.pop();
    total += 1;
    const winningNumbers = getWinningNumbers(card);
    const cardNumbers = getCardNumbers(card);
    const cardId = getCardId(card);
    const winningMatches = calculateWinningNumbers(winningNumbers, cardNumbers);
    for (let i = 0; i < winningMatches.length; i++) {
      scratchcards.push(data[cardId + i]);
    }

    // probably should have stored in object { cardNum: count } instead as this is slow
  }
  return total;
}

console.log({
  part1: part1(),
  part2: part2(),
});
