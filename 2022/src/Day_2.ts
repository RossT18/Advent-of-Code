import { readDataRaw } from './DataReader.js';

const rpsDataPart1 = readDataRaw(2)
  .replace(/[A|X]/gm, 'rock')
  .replace(/[B|Y]/gm, 'paper')
  .replace(/[C|Z]/gm, 'scissors')
  .split('\n');

type RPSMove = 'rock' | 'paper' | 'scissors';
type RPSResult = 'win' | 'loss' | 'draw';

const moves: RPSMove[] = ['rock', 'paper', 'scissors'];

function playRPS(player: RPSMove, opponent: RPSMove): RPSResult {
  if (player === opponent) return 'draw';

  const pi = moves.indexOf(player);
  const oi = moves.indexOf(opponent);

  // If the next move in list after player's move (wraps to start) is opponent's move, player lost
  return (pi + 1) % 3 === oi ? 'loss' : 'win';
}

const RESULT_MAP = {
  win: 6,
  draw: 3,
  loss: 0,
};

const resultsPart1: number[] = rpsDataPart1.map((round) => {
  const [opponent, recommendation] = round.split(' ', 2) as RPSMove[];

  const game = playRPS(recommendation, opponent);

  return RESULT_MAP[game] + (moves.indexOf(recommendation) + 1);
});

console.log(
  'Part 1:',
  resultsPart1.reduce((acc, v) => acc + v),
);

const rpsDataPart2 = readDataRaw(2)
  .replace(/A/gm, 'rock')
  .replace(/B/gm, 'paper')
  .replace(/C/gm, 'scissors')
  .replace(/X/gm, 'loss')
  .replace(/Y/gm, 'draw')
  .replace(/Z/gm, 'win')
  .split('\n');

function reverseRPS(move: RPSMove, result: RPSResult): RPSMove {
  if (result === 'draw') return move;

  const jump = result === 'win' ? 1 : 2;

  const mi = moves.indexOf(move);

  return moves[(mi + jump) % 3];
}

const resultsPart2 = rpsDataPart2.map((round) => {
  const [move, result] = round.split(' ', 2) as [RPSMove, RPSResult];

  const moveToMake = reverseRPS(move, result);

  return moves.indexOf(moveToMake) + 1 + RESULT_MAP[result];
});

console.log(
  'Part 2:',
  resultsPart2.reduce((acc, v) => acc + v),
);
