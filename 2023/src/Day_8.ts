import { readDataArray } from './DataReader.js';

enum Element {
  L,
  R,
}

type Node = { [position: string]: string[] };

const [instruction, _, ...rawSequence] = readDataArray(8);

const sequence: Node = Object.fromEntries(rawSequence.map((s) => parseNode(s)));

function parseNode(raw: string) {
  // AAA = (BBB, BBB)
  const position = raw.slice(0, 3);
  const elements = raw.slice(7, 15).split(', ');

  return [position, elements];
}

function traverse(start: string = 'AAA', hasEnded: (position: string) => boolean) {
  let currentPosition = start;
  let jumpCount = 0;

  while (!hasEnded(currentPosition)) {
    const currentInstruction = instruction[jumpCount % instruction.length] as 'L' | 'R';
    currentPosition = sequence[currentPosition][Element[currentInstruction]];
    jumpCount++;
  }

  return jumpCount;
}

function part1() {
  return traverse('AAA', (pos) => pos === 'ZZZ');
}

function part2() {
  const starts = Object.keys(sequence).filter((pos) => {
    return pos.at(2) === 'A';
  });

  const hasEnded = (pos: string) => pos.at(2) === 'Z';

  const jumps = starts.map((start) => {
    return traverse(start, hasEnded);
  });

  function findLCM(numbers: number[]): number {
    const hcf = (a: number, b: number) => (b === 0 ? a : hcf(b, a % b));
    const lcm = (a: number, b: number) => (a / hcf(a, b)) * b;
    const lcmAll = (nums: number[]) => nums.reduce(lcm, 1);

    return lcmAll(numbers);
  }

  return findLCM(jumps);
}

console.log({
  part1: part1(),
  part2: part2(),
});
