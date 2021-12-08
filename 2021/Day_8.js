const fs = require('fs');

function readInput() {
  try {
    const data = fs.readFileSync('/Users/rosstinsley/Documents/Personal/Advent-of-Code/2021/input/Day_8.txt', 'utf8');
    return data.split('\n');
  } catch (error) {
    console.error(error);
  }
}

function part1(outputValues) {
  const simpleMap = {
    2: {'value': 1, 'count': 0},
    4: {'value': 4, 'count': 0},
    3: {'value': 7, 'count': 0},
    7: {'value': 8, 'count': 0}
  }

  outputValues.forEach(line => {
    line.forEach(value => {
      if (value.length in simpleMap) {
        simpleMap[value.length].count++;
      }
    });
  });

  return Object.entries(simpleMap).map(v => v[1].count).reduce((acc, v) => acc + v, 0);
}

function convert(table, output) {
  let vals = '';
  output.forEach(v => {
    const sorted = sortStr(v);
    if (!(sorted in table)) console.error(sorted, "is not a key of", Object.keys(table));
    vals += (table[sorted]).toString();
  });

  return parseInt(vals);
}

function decoder(input) {
  const segments = Array(7).fill(null);
  // Top is difference between 1 and 7
  const one = input.filter(v => v.length === 2)[0];
  const four = input.filter(v => v.length === 4)[0];
  const seven = input.filter(v => v.length === 3)[0];
  const eight = input.filter(v => v.length === 7)[0];

  const fives = input.filter(v => v.length === 5); // 2, 3, 5
  
  const top = seven.split('').filter(ltr => one.indexOf(ltr) === -1)[0];
  
  const rightGroup = one.split('');
  const leftGroup = four.split('').filter(ltr => one.indexOf(ltr) === -1);
  const bottomGroup = eight.split('').filter(ltr => ltr !== top && four.indexOf(ltr) === -1);
  
  segments[0] = top;
  fives.forEach(v => {
    if (v.indexOf(bottomGroup[0]) !== -1 && v.indexOf(bottomGroup[1]) !== -1) {
      // if v has both bottomGroup values, it's a 5. So one of the characters will be from right group
      segments[1] = v.split('').filter(ltr => rightGroup.includes(ltr))[0];
      segments[2] = rightGroup.filter(ltr => ltr !== segments[1])[0];
    } else if (v.indexOf(leftGroup[0]) !== -1 && v.indexOf(leftGroup[1]) !== -1) {
      // if v has both leftGroup valies, it's 2. So ONE char is from bottom group.
      segments[3] = v.split('').filter(ltr => bottomGroup.includes(ltr))[0];
      segments[4] = bottomGroup.filter(ltr => ltr !== segments[3])[0];
    } else {
      // must be a 3
      segments[6] = v.split('').filter(ltr => ltr !== top && !rightGroup.includes(ltr) && !bottomGroup.includes(ltr))[0];
    }
  });

  segments[5] = eight.split('').filter(ltr => !segments.includes(ltr))[0];

  const numbers = [
    [true, true, true, true, true, true, false], // 0
    [false, true, true, false, false, false, false], // 1
    [true, true, false, true, true, false, true], // 2
    [true, true, true, true, false, false, true], // 3
    [false, true, true, false, false, true, true], // 4
    [true, false, true, true, false, true, true], // 5
    [true, false, true, true, true, true, true], // 6
    [true, true, true, false, false, false, false], // 7
    [true, true, true, true, true, true, true], // 8
    [true, true, true, true, false, true, true], // 9
  ];

  let table = {};

  numbers.forEach((num, i) => {
    let str = '';
    num.forEach((cond, j) => {
      if (cond) str += segments[j];
    });

    table[sortStr(str)] = i;
  });

  return table;
}

function sortStr(str) {
  return str.split('').sort().join('');
}

function part2(entries) {
  let sum = 0;

  entries.forEach(e => {
    const [input, output] = e.split(" | ").map(v => v.split(" "));

    const lookupTable = decoder(input);

    const entryOutputValue = convert(lookupTable, output); // four-digit int
    sum += entryOutputValue;
  })

  return sum;
}

const fullInput = readInput();
const outputValues = fullInput.map(v => v.split(" | ")[1].split(" "));

console.log('Part 1:', part1(outputValues));
console.log('Part 2:', part2(fullInput));