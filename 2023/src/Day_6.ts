import { readDataArray } from './DataReader.js';

const data = readDataArray(6);

function getData(dataLine: string) {
  return dataLine
    .split(' ')
    .slice(1)
    .map((t) => t.trim())
    .filter((t) => t.length > 0)
    .map((t) => parseInt(t));
}

function part1() {
  const times = getData(data[0]);
  const wrDistances = getData(data[1]);
  let total = 1;
  for (let i = 0; i < times.length; i++) {
    const time = times[i];
    const wrDistance = wrDistances[i];

    let winningTimeCount = 0;

    for (let holdTime = 1; holdTime < time; holdTime++) {
      const travelTime = time - holdTime;

      const distanceTravelled = travelTime * holdTime;
      if (distanceTravelled > wrDistance) winningTimeCount++;
    }
    total *= winningTimeCount;
  }
  return total;
}

function part2() {
  const time = parseInt(getData(data[0]).join(''));
  const wrDistance = parseInt(getData(data[1]).join(''));

  let winningTimeCount = 0;
  for (let holdTime = 1; holdTime < time; holdTime++) {
    const travelTime = time - holdTime;

    const distanceTravelled = travelTime * holdTime;
    if (distanceTravelled > wrDistance) winningTimeCount++;
  }
  return winningTimeCount;
}

console.log({
  part1: part1(),
  part2: part2(),
});
