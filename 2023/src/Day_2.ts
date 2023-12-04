import { readDataArray } from './DataReader.js';

const data = readDataArray(2);

function getGameId(game: string): number {
  const match = game.match(/Game (\d+)/);
  if (!match) {
    console.error('no game id match');
    return -1;
  }
  return parseInt(match[1]);
}

type CubeColour = 'red' | 'green' | 'blue';
type CubeCounts = { [col in CubeColour]: number };

function getColourCubeMinimum(game: string): CubeCounts {
  const minimums: CubeCounts = {
    red: 0,
    green: 0,
    blue: 0,
  };
  const groups = game.split(':')[1].split(';');
  for (const group of groups) {
    const { red, green, blue } = getColourCubeGroupTotal(group);

    if (red > minimums.red) {
      minimums.red = red;
    }
    if (green > minimums.green) {
      minimums.green = green;
    }
    if (blue > minimums.blue) {
      minimums.blue = blue;
    }
  }

  return minimums;
}

function getColourCubeGroupTotal(group: string) {
  // group like "1 red, 2 green" (note missing semicolon)
  const counts: CubeCounts = {
    red: 0,
    green: 0,
    blue: 0,
  };
  const cubes = group.split(',');
  for (const cube of cubes) {
    // cube as "${COUNT} ${COLOUR}"
    const [countStr, colourStr] = cube.trim().split(' ');
    const count = parseInt(countStr);
    const colour = colourStr as CubeColour;

    counts[colour] += count;
  }
  return counts;
}

function isPossible(counts: CubeCounts, criteria: CubeCounts): boolean {
  return Object.entries(counts).every(([colour, count]) => {
    return count <= criteria[colour];
  });
}

function part1() {
  const criteria: CubeCounts = {
    red: 12,
    green: 13,
    blue: 14,
  };

  const idTotals = data.reduce((prev, curr) => {
    const groups = curr.split(':')[1].split(';');
    const groupCounts = groups.map((group) => {
      return getColourCubeGroupTotal(group.trim());
    });

    const isGamePossible = groupCounts.every((groupCount) => {
      return isPossible(groupCount, criteria);
    });

    return prev + (isGamePossible ? getGameId(curr) : 0);
  }, 0);

  return idTotals;
}

function part2() {
  return data.reduce((prev, curr) => {
    const { red, green, blue } = getColourCubeMinimum(curr);

    return prev + red * green * blue;
  }, 0);
}

console.log({ part1: part1(), part2: part2() });
