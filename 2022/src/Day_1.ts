import { readDataArray } from './DataReader.js';

function findHighestCalorieElf(calories: string[]): number {
  return calories.reduce(
    ([currentMax, current], currentCalorie) => {
      if (currentCalorie.length > 0) return [currentMax, current + Number.parseInt(currentCalorie)];
      // New elf
      if (current > currentMax) {
        return [current, 0];
      } else {
        return [currentMax, 0];
      }
    },
    [0, 0],
  )[0];
}

const data = readDataArray(1);
const highest = findHighestCalorieElf(data);
console.log('Part 1:', highest);

function findTop3CalorieElves(calories: string[]) {
  const calorieTotals = [];

  let current = 0;
  calories.forEach((c) => {
    if (c.length > 0) current += Number.parseInt(c);
    else {
      // New elf
      calorieTotals.push(current);
      current = 0;
    }
  });

  return calorieTotals.sort((a, b) => b - a).slice(0, 3);
}

const topThree = findTop3CalorieElves(data);
const sum = topThree.reduce((p, c) => {
  return p + c;
}, 0);

console.log('Part 2:', sum);
