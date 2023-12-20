import { readDataArray } from './DataReader.js';

const data = readDataArray(9).map((line) => {
  return line.split(' ').map((v) => parseInt(v));
});

function findDifferences(input: number[]): number[] {
  const differences = [];
  for (let i = 0; i < input.length - 1; i++) {
    const current = input[i];
    const next = input[i + 1];

    differences.push(next - current);
  }

  return differences;
}

function allZero(arr: number[]): boolean {
  return arr.every((v) => v === 0);
}

function extrapolate(differences: number[][], direction: 'forward' | 'backward'): number {
  return differences.reduceRight((acc, c) => {
    return direction === 'forward' ? acc + c.at(-1) : c.at(0) - acc;
  }, 0);
}

function part1() {
  const extrapolations = [];
  data.forEach((d) => {
    const differences = [d];
    while (!allZero(differences.at(-1))) {
      differences.push(findDifferences(differences.at(-1)));
    }
    extrapolations.push(extrapolate(differences, 'forward'));
  });

  return extrapolations.reduce((acc, v) => acc + v);
}

function part2() {
  const extrapolations = [];
  data.forEach((d) => {
    const differences = [d];
    while (!allZero(differences.at(-1))) {
      differences.push(findDifferences(differences.at(-1)));
    }
    extrapolations.push(extrapolate(differences, 'backward'));
  });
  return extrapolations.reduce((acc, v) => acc + v);
}

console.log({
  part1: part1(),
  part2: part2(),
});
