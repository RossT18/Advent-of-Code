import { readDataRaw } from './DataReader.js';
import _ from 'lodash';

const [rawStack, rawMoves] = readDataRaw(5).split('\n\n');

function formatStack(raw: string) {
  const horizontalStacks = raw
    .replace(/ (   )/gm, '-')
    .replace(/\] \[|\[|\]| /gm, '')
    .split('\n')
    .map((l) => l.split(''));

  const stacks: string[][] = Array.from(
    new Array(horizontalStacks[horizontalStacks.length - 1].length),
    () => {
      return [];
    },
  );

  for (let i = horizontalStacks.length - 2; i >= 0; i--) {
    const row = horizontalStacks[i];
    row.forEach((item, j) => {
      if (item !== '-') {
        stacks[j].push(item);
      }
    });
  }

  return stacks;
}

function parseInstruction(instruction: string): number[] {
  return instruction
    .match(/move (\d+) from (\d+) to (\d+)/)
    .slice(1, 4)
    .map((n) => Number.parseInt(n));
}

function moveStack9000(instruction: string, stacks: string[][]): string[][] {
  const stacksCopy: string[][] = _.cloneDeep(stacks);
  const [count, from, to] = parseInstruction(instruction);
  for (let i = 0; i < count; i++) {
    const popped = stacksCopy[from - 1].pop();
    stacksCopy[to - 1].push(popped);
  }

  return stacksCopy;
}

function moveStack9001(instruction: string, stacks: string[][]): string[][] {
  const stacksCopy: string[][] = _.cloneDeep(stacks);
  const [count, from, to] = parseInstruction(instruction);

  const popped = stacksCopy[from - 1].splice(stacksCopy[from - 1].length - count, count);
  stacksCopy[to - 1].push(...popped);

  return stacksCopy;
}

function getTop(stacks: string[][]): string {
  return stacks
    .map((stack) => {
      return stack.length > 0 ? stack[stack.length - 1] : '';
    })
    .join('');
}

let stacksP1 = formatStack(rawStack);
let stacksP2 = formatStack(rawStack);

rawMoves.split('\n').forEach((m) => {
  stacksP1 = moveStack9000(m, stacksP1);
  stacksP2 = moveStack9001(m, stacksP2);
});

console.log('Part 1:', getTop(stacksP1));
console.log('Part 2:', getTop(stacksP2));
