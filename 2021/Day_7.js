const fs = require('fs');

function readInput() {
  try {
    const data = fs.readFileSync('/Users/rosstinsley/Documents/Personal/Advent-of-Code/2021/input/Day_7.txt', 'utf8');
    return data.split(',').map(Number);
  } catch (error) {
    console.error(error);
  }
}

const crabs = readInput();

function maximumCrab(crabs) {
  return crabs.reduce((acc, v) => {
  if (v >= acc) {
    return v;
  }
  return acc;
}, crabs[0]);
}

function findCheapest(fuel) {
  return fuel.reduce((acc, v) => {
    if (v < acc) {
      return v;
    }
    return acc;
  }, fuel[0]);
}

function calculateSingleCrabCost(crab, target) {
  const linear = Math.abs(crab - target);
  let cost = 0;
  for (let i = 1; i < linear + 1; i++) {
    cost += i;
  }
  return cost;
}

function calculateFuelConstant(crabs, target) {
  return crabs.reduce((acc, v) => {
    return acc + Math.abs(v - target);
  }, 0);
}

function calculateFuel(crabs, target) {
  return crabs.reduce((acc, v, i) => {
    return acc + calculateSingleCrabCost(v, target);
  }, 0);
}

function part1(crabs) {
  const maximum = maximumCrab(crabs);
  const fuel = Array(maximum);

  for (let i = 0; i < maximum; i++) {
    fuel[i] = calculateFuelConstant(crabs, i);
  }

  return findCheapest(fuel);
}

function part2(crabs) {
  const maximum = maximumCrab(crabs);
  const fuel = Array(maximum);

  for (let i = 0; i < maximum; i++) {
    fuel[i] = calculateFuel(crabs, i);
  }

  return findCheapest(fuel);
}


console.log("Part 1:", part1(crabs));
console.log("Part 2:", part2(crabs));