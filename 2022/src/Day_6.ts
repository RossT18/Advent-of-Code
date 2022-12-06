import { readDataRaw } from './DataReader.js';

const stream = readDataRaw(6).split('');

function checkUnique(arr: string[]): boolean {
  return new Set(arr).size === arr.length;
}

function findMarker(data: string[], uniqueLength: number): number {
  const lastUniqueN = data.slice(0, uniqueLength);

  for (let i = uniqueLength; i < data.length; i++) {
    if (checkUnique(lastUniqueN)) return i;

    lastUniqueN.push(data[i]);
    lastUniqueN.splice(0, 1);
  }

  return -1;
}

console.log('Part 1:', findMarker(stream, 4));
console.log('Part 2:', findMarker(stream, 14));
