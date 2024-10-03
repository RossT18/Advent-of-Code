import { readDataArray } from './DataReader.js';

const pipeMap = readDataArray(10).map((p) => {
  return p.split('');
});

const rowIndex = pipeMap.findIndex((r) => r.includes('S'));
const colIndex = pipeMap[rowIndex].findIndex((r) => r === 'S');

const startIndex = [rowIndex, colIndex];

const directions = ['north', 'south', 'east', 'west'] as const;
const pipes = ['|', '-', '7', 'J', 'F', 'L'] as const;

type Pipe = (typeof pipes)[number];
type Direction = (typeof directions)[number];

const directionsToPipe: { [dir in Direction]: Partial<Pipe>[] } = {
  north: ['|', 'F', '7'],
  south: ['|', 'J', 'L'],
  east: ['-', '7', 'J'],
  west: ['-', 'F', 'L'],
};
const pipeToDirections: { [pipe in Pipe]: Direction[] } = {
  '7': ['south', 'west'],
  '|': ['north', 'south'],
  F: ['south', 'east'],
  J: ['north', 'west'],
  L: ['north', 'east'],
  '-': ['east', 'west'],
};

const directionsToIndices: { [dir in Direction]: number[] } = {
  north: [-1, 0],
  south: [1, 0],
  east: [0, 1],
  west: [0, -1],
};
const oppositeDirections = {
  north: 'south',
  south: 'north',
  east: 'west',
  west: 'east',
};

function getCurrentPipe(index: number[]): Pipe | 'S' {
  return pipeMap[index[0]][index[1]] as Pipe | 'S';
}

function addIndexToPosition(position: number[], index: number[]): number[] {
  return [position[0] + index[0], position[1] + index[1]];
}

function travel(): number {
  let jumps = 0;

  let lastPipeIndex = startIndex;

  let currentPipeIndex = addIndexToPosition(
    startIndex,
    Object.entries(directionsToIndices).find(([key, [r, c]]) => {
      const realIndex = addIndexToPosition(startIndex, [r, c]);
      const pipe = getCurrentPipe(realIndex);
      const direction = pipeToDirections[pipe];
      if (direction === undefined) return false;
      return direction.map((d) => oppositeDirections[d]).includes(key);
    })[1],
  );
  let currentPipe = getCurrentPipe(currentPipeIndex);

  while (currentPipe !== 'S') {
    const directions = pipeToDirections[currentPipe];
    const directionIndex = directions
      .map((d) => addIndexToPosition(currentPipeIndex, directionsToIndices[d]))
      .filter((i) => i[0] !== lastPipeIndex[0] || i[1] !== lastPipeIndex[1])[0];

    lastPipeIndex = currentPipeIndex;
    currentPipeIndex = directionIndex;
    currentPipe = getCurrentPipe(directionIndex);

    jumps++;
  }

  // pretend jumping back to starting position
  jumps++;

  return jumps;
}

function part1() {
  return travel() / 2;
}

console.log({
  part1: part1(),
});
