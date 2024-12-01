import { readDataArray } from './DataReader.js';

type Lists = [number, number][];

const rows = readDataArray(1).map((row) => row.split('   ').map((id) => parseInt(id))) as Lists;

function part1(lists: Lists): number {
  const left = lists.map((r) => r[0]).sort((a, b) => a - b);
  const right = lists.map((r) => r[1]).sort((a, b) => a - b);

  return left.reduce((acc, id, i) => acc + Math.abs(id - right[i]), 0);
}

function part2(lists: Lists): number {
  const left = lists.map(r => r[0]);
  const right = lists.map(r => r[1]);

  return left.reduce((acc, id, i) => {
    const rightCount = right.filter(v => v === id).length;

    return acc + (id * rightCount);
  }, 0)
}

console.log({ part1: part1(rows), part2: part2(rows));
