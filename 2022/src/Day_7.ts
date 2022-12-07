import { readDataArray } from './DataReader.js';

const input = readDataArray(7);

const fileSystem: { [key: string]: number } = {};

function getFileSize(file: string): number {
  return Number.parseInt(file.split(' ', 2)[0]);
}

const currentDirectory: string[] = [];

input.forEach((inp) => {
  if (inp.startsWith('$')) {
    const [command, args] = inp.slice(2, inp.length).split(' ', 2); // Remove $ and get command with args

    if (command === 'cd') {
      if (args !== '..') {
        currentDirectory.push(args);
      } else {
        currentDirectory.pop();
      }
    }
  } else {
    if (inp.startsWith('dir')) return;

    const size = getFileSize(inp);

    currentDirectory.forEach((_, i) => {
      const path = currentDirectory.slice(0, i + 1).join('+');
      fileSystem[path] = (fileSystem[path] ?? 0) + size;
    });
  }
});

const dirsLessThan100k = Object.values(fileSystem).reduce((acc, v) => {
  if (v <= 100_000) return acc + v;
  return acc;
}, 0);

console.log('Part 1:', dirsLessThan100k);

const AVAILABLE_SPACE = 70_000_000;
const UPDATE_SIZE = 30_000_000;

const unusedSpace = AVAILABLE_SPACE - fileSystem['/'];

const dirToDelete = Object.entries(fileSystem).reduce(
  (currentSmallest, current) => {
    const size = current[1];

    const bigEnough = size >= UPDATE_SIZE - unusedSpace;
    const smallerThanPrevious = currentSmallest[0] === '' || currentSmallest[1] > size;

    return bigEnough && smallerThanPrevious ? current : currentSmallest;
  },
  ['', 0],
);

console.log('Part 2:', dirToDelete[1]);
