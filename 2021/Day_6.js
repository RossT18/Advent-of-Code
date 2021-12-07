const fs = require('fs');

function readInput() {
  try {
    const data = fs.readFileSync('/Users/rosstinsley/Documents/Personal/Advent-of-Code/2021/input/Day_6.txt', 'utf8');
    return data.split(',').map(Number);
  } catch (error) {
    console.error(error);
  }
}

function part1(fish, days) {
  for (let day = 0; day < days; day++) {
    fish.forEach((f, i) => {
      if (f > 0) fish[i]--;
      else {
        fish[i] = 6;
        fish.push(8);
      }
    });
  }

  return fish.length;
}

function part2(fish, days) {
  let fishArray = Array(9).fill(0);

  // Fill fish array with initial state
  fish.forEach(f => {
    fishArray[f]++;
  })

  for (let day = 0; day < days; day++) {
    let relativeDay = day % fishArray.length;

    fishArray[(relativeDay + 7) % fishArray.length] += fishArray[relativeDay];
  }

  return fishArray.reduce((acc, v) => acc + v, 0);
}

const fish = readInput();

console.log("Part 1:", part1([...fish], 80));
console.log("Part 2:", part2([...fish], 256));