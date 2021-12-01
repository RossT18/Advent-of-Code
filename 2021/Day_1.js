const fs = require('fs');

function readInput() {
  try {
    const data = fs.readFileSync('/Users/rosstinsley/Documents/Personal/Advent-of-Code/2021/input/Day_1.txt', 'utf8');
    return data.split('\n').map(depth => parseInt(depth));
  } catch (error) {
    console.error(error);
  }
}

function part1(array) {
  let count = 0;
  
  for (let i = 1; i < array.length; i++) {
    if (array[i] > array[i-1]) {
      count++;
    }
  }

  return count;
}

function part2(array) {
  let count = 0;

  for (let i = 1; i < array.length; i++) {
    if (i + 2 > array.length - 1) {
      // No more triplets
      break;
    }

    const sum = array[i] + array[i+1] + array[i+2];
    const prevSum = array[i-1] + array[i] + array[i+1];

    if (sum > prevSum) {
      count++;
    }
  }

  // Could have made a new array of sums and called part1() with that array too, but that is slower.

  return count;
}

let array = readInput();

console.log('Part 1:', part1(array));
console.log('Part 2:', part2(array));