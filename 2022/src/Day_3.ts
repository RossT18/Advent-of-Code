import { readDataArray } from './DataReader.js';

const rucksacks = readDataArray(3);

function getPriority(char: string): number {
  const code = char.charCodeAt(0);

  const lowerOffset = 'a'.charCodeAt(0) - 1;
  const capitalOffset = 'A'.charCodeAt(0) - 27;

  return code - (code < 97 ? capitalOffset : lowerOffset);
}

function findItemInBothCompartments(rucksack: string): string {
  let common = '';
  const halfway = Math.floor(rucksack.length / 2);

  const first = rucksack.slice(0, halfway).split('');
  const second = rucksack.slice(halfway, rucksack.length).split('');

  first.forEach((item) => {
    if (second.includes(item)) {
      common = item;
    }
  });

  return common;
}

const sum = rucksacks.reduce((acc, v) => {
  const commonItem = findItemInBothCompartments(v);
  const priority = getPriority(commonItem);

  return acc + priority;
}, 0);

console.log('Part 1:', sum);

const groups = [];

while (rucksacks.length > 0) {
  groups.push(rucksacks.splice(0, 3));
}

function findGroupBadge(group: string[]): string {
  const bagOneItems = group[0].split('');
  let badge = '';
  bagOneItems.forEach((item) => {
    if (group[1].includes(item) && group[2].includes(item)) {
      badge = item;
    }
  });

  return badge;
}

const p2Sum = groups.reduce((acc, v) => {
  const badge = findGroupBadge(v);
  const priority = getPriority(badge);

  return acc + priority;
}, 0);

console.log('Part 2:', p2Sum);
