const fs = require('fs');

function readInput() {
  try {
    const data = fs.readFileSync('/Users/rosstinsley/Documents/Personal/Advent-of-Code/2021/input/Day_3.txt', 'utf8');
    return data.split('\n');
  } catch (error) {
    console.error(error);
  }
}

function getOnesCount(binaries) {
  const count = {};
  binaries.forEach(binary => {
    binary.split("").forEach((bit, i) => {
      if (bit === "1") i in count ? count[i]++ : count[i] = 1;
    })
  });

  return count;
}

function part1(binaries) {
  const count = getOnesCount(binaries);

  let gamma = 0, epsilon = 0;
  const realPos = (pos) => Object.keys(count).length - 1 - pos

  for (const [pos, ones] of Object.entries(count)) {
    if (ones >= binaries.length / 2) {
      gamma += 2 ** realPos(pos);
    } else {
      epsilon += 2 ** realPos(pos);
    }
  }

  return gamma * epsilon;
}

function find(binaries, pos, oxygen) {
  const count = getOnesCount(binaries);

  binaries = binaries.filter(binary => {
    const bit = (count[pos] >= binaries.length / 2) ? (oxygen ? '1' : '0') : (oxygen ? '0' : '1'); // 🤮
    return binary.charAt(pos) === bit;
  })

  if (binaries.length > 1) {
    return find(binaries, pos + 1, oxygen);
  } else {
    return binaries[0];
  }

}

function part2(binaries) {
  const oxygen = find(binaries, 0, true);
  const scrubber = find(binaries, 0, false);

  return parseInt(oxygen, 2) * parseInt(scrubber, 2);
}

let binaries = readInput();

console.log('Part 1:', part1(binaries));
console.log('Part 2:', part2(binaries));