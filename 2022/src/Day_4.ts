import { readDataArray } from './DataReader.js';

const pairs = readDataArray(4).map((pair) => {
  return pair.split(',', 2).map((p) => p.split('-', 2).map((n) => Number.parseInt(n)));
});

function getSections(pair: number[][]): { [key: number]: string } {
  const sections = {};

  ['A', 'B'].forEach((elf, i) => {
    for (let v = pair[i][0]; v < pair[i][1] + 1; v++) {
      if (v in sections) sections[v] = 'C';
      else sections[v] = elf;
    }
  });
  return sections;
}

const fullyContainsSum = pairs.reduce((acc, pair) => {
  const sections = getSections(pair);

  const containsAs = Object.values(sections).includes('A');
  const containsBs = Object.values(sections).includes('B');

  return !containsAs || !containsBs ? acc + 1 : acc;
}, 0);

const partialContainsSum = pairs.reduce((acc, pair) => {
  const sections = getSections(pair);
  return Object.values(sections).includes('C') ? acc + 1 : acc;
}, 0);

console.log('Part 1:', fullyContainsSum);
console.log('Part 2:', partialContainsSum);
