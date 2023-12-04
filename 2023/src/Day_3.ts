import { readDataArray } from './DataReader.js';

const data = readDataArray(3);

interface EngineNumberData {
  number: number;
  column: number;
  row: number;
  length: number;
}

function getNumbersAndIndicesFromLine(line: string, row: number): EngineNumberData[] {
  const matches = line.matchAll(/\d+/g);
  if (!matches) {
    return [];
  }
  return Array.from(matches).map((m) => ({
    number: parseInt(m[0]),
    column: m.index,
    length: m[0].length,
    row,
  }));
}

function adjacentIndices(engineNumber: EngineNumberData): number[][] {
  const dataSize = {
    height: data.length,
    width: data[0].length,
  };

  const adjacents = [
    [engineNumber.column - 1, engineNumber.row], //left
    [engineNumber.column - 1, engineNumber.row - 1], //diagonal left up
    [engineNumber.column - 1, engineNumber.row + 1], // diagonal left down

    [engineNumber.column + engineNumber.length, engineNumber.row], //right
    [engineNumber.column + engineNumber.length, engineNumber.row - 1], //diagonal right up
    [engineNumber.column + engineNumber.length, engineNumber.row + 1], //diagonal right down
  ];

  for (let i = 0; i < engineNumber.length; i++) {
    adjacents.push([engineNumber.column + i, engineNumber.row - 1]); // up
    adjacents.push([engineNumber.column + i, engineNumber.row + 1]); // down
  }

  return adjacents.filter((adj) => {
    return adj.every((v, i) => {
      return v >= 0 && v < dataSize[i === 0 ? 'width' : 'height'];
    });
  });
}

function isSymbol(value: string): boolean {
  return value != null && value !== '.' && value.match(/\d/g) === null;
}

function part1() {
  const allNumbers = data
    .map((d, i) => {
      return getNumbersAndIndicesFromLine(d, i);
    })
    .flat();

  // Now I need to scan adjacent (incl. diagonal) values in data for a symbol
  // is a symbol if not a dot or a number and is in range of array

  return allNumbers.reduce((prev, engineNumber) => {
    const indices = adjacentIndices(engineNumber);
    // Check for symbol, if symbol add to total
    const values = indices.map(([column, row]) => data[row][column]);

    return values.some((v) => isSymbol(v)) ? prev + engineNumber.number : prev;
  }, 0);
}

function part2() {
  const allNumbers = data
    .map((d, i) => {
      return getNumbersAndIndicesFromLine(d, i);
    })
    .flat();

  const gearIndices: { [index: string]: number[] } = {};
  allNumbers.forEach((engineNumber) => {
    const indices = adjacentIndices(engineNumber);
    indices.forEach(([column, row]) => {
      const value = data[row][column];
      if (value !== '*') return;

      const key = `${column},${row}`;
      if (!gearIndices[key]) {
        gearIndices[key] = [];
      }
      gearIndices[key].push(engineNumber.number);
    });
  });

  return Object.values(gearIndices)
    .filter((v) => v.length === 2)
    .reduce((acc, c) => acc + c[0] * c[1], 0);
}

console.log({ part1: part1(), part2: part2() });
