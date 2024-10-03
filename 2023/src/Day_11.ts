import { readDataArray } from './DataReader.js';

const universe = readDataArray(11).map((line) => line.split(''));

function isEmpty(line: string[]): boolean {
  return line.every((point) => point === '.');
}

function findEmptyRowIndices(universe: string[][]): number[] {
  return universe.reduce((acc, row, i) => {
    if (!isEmpty(row)) return acc;
    return acc.concat(i);
  }, [] as number[]);
}

function findEmptyColumnIndices(universe: string[][]): number[] {
  const emptyColumnIndices = Array(universe[0].length).fill(true);
  for (let r = 0; r < universe.length; r++) {
    const row = universe[r];
    for (let c = 0; c < row.length; c++) {
      if (emptyColumnIndices[c] && row[c] === '#') emptyColumnIndices[c] = false;
    }
  }
  return emptyColumnIndices.map((v, i) => (v ? i : -1)).filter((v) => v >= 0);
}

function expandUniverse(_universe: string[][]): string[][] {
  const universe = JSON.parse(JSON.stringify(_universe));

  const emptyRowIndices = findEmptyRowIndices(universe).reverse();
  for (const rowIndex of emptyRowIndices) {
    universe.splice(rowIndex, 0, Array(universe[rowIndex].length).fill('.'));
  }

  const emptyColumnIndices = findEmptyColumnIndices(universe).reverse();
  for (let r = 0; r < universe.length; r++) {
    for (const columnIndex of emptyColumnIndices) {
      universe[r].splice(columnIndex, 0, '.');
    }
  }

  return universe;
}

function findGalaxies(universe: string[][]): number[][] {
  const indices = [];
  universe.forEach((row, r) => {
    row.forEach((point, c) => {
      if (point === '#') {
        indices.push([r, c]);
      }
    });
  });
  return indices;
}

function findDifferenceBetweenIndices(index1: number[], index2: number[]): number[] {
  return [Math.abs(index1[0] - index2[0]), Math.abs(index1[1] - index2[1])];
}

function findDistanceBetweenGalaxies(universe: string[][]): number[] {
  const distances: number[] = [];
  const galaxyPositions = findGalaxies(universe);
  for (let i = 0; i < galaxyPositions.length - 1; i++) {
    const galaxyPosition = galaxyPositions[i];
    const followingGalaxyPositions = galaxyPositions.slice(i + 1);
    // Find distance with every subsequent galaxy
    followingGalaxyPositions.forEach((subGalaxyPos, j) => {
      const diff = findDifferenceBetweenIndices(galaxyPosition, subGalaxyPos);

      // console.log({ i: i + 1, j: j + i + 2, diff });
      distances.push(diff[0] + diff[1]);
    });
  }
  return distances;
}

function findDistanceBetweenGalaxyWithExpansion(universe: string[][], age: number): number[] {
  const distances: number[] = [];
  const galaxyPositions = findGalaxies(universe);

  const emptyRows = findEmptyRowIndices(universe);
  const emptyCols = findEmptyColumnIndices(universe);

  for (let i = 0; i < galaxyPositions.length - 1; i++) {
    const galaxyPosition = galaxyPositions[i];
    const followingGalaxyPositions = galaxyPositions.slice(i + 1);
    // Find distance with every subsequent galaxy
    followingGalaxyPositions.forEach((subGalaxyPos, j) => {
      const emptyRowsBetween = emptyRows.filter(
        (r) => r < subGalaxyPos[0] && r > galaxyPosition[0],
      );
      const emptyColsBetween = emptyCols.filter(
        (c) =>
          c < Math.max(subGalaxyPos[1], galaxyPosition[1]) &&
          c > Math.min(subGalaxyPos[1], galaxyPosition[1]),
      );
      let diff = findDifferenceBetweenIndices(galaxyPosition, subGalaxyPos);

      diff[0] = diff[0] + emptyRowsBetween.length * age;
      diff[1] = diff[1] + emptyColsBetween.length * age;
      distances.push(diff[0] + diff[1]);
    });
  }
  return distances;
}

function part1() {
  const expandedUniverse = expandUniverse(universe);
  const distances = findDistanceBetweenGalaxies(expandedUniverse);
  return distances.reduce((acc, d) => acc + d);
}

function part2() {
  const distances = findDistanceBetweenGalaxyWithExpansion(universe, 10);
  return distances.reduce((acc, d) => acc + d);
}

console.log({
  part1: part1(),
  part2: part2(),
});
