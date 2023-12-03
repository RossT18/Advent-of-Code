import { readDataArray } from './DataReader.js';

const lines = readDataArray(1);

function getFirstLast(numbers: number[]): number {
  let nums = numbers;
  if (numbers.length !== 2) {
    nums = [numbers[0], numbers.at(-1)];
  }

  return parseInt(nums.join(''));
}

function removeLetters(line: string): number {
  const match = line.match(/\d/g);
  if (!match) {
    console.error('got null matches', line);
    return 0;
  }
  const numbers = Array.from(match).map((v) => parseInt(v));
  if (!numbers || numbers.length === 0) {
    console.error('got zero', line);
    return 0;
  }

  return getFirstLast(numbers);
}

function removeLettersKeepSpelledNumbers(line: string): number {
  const numbers = [];
  const digitMatches = Array.from(line.matchAll(/\d/g));
  digitMatches.forEach((match) => {
    numbers.push({ number: parseInt(match[0]), index: match.index });
  });
  const wordNumberMap = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
  };

  // Check for each spelled number if the line includes it, and store indices
  Object.entries(wordNumberMap).forEach(([word, number]) => {
    const match = line.matchAll(RegExp(word, 'g'));
    if (!match) return;
    const matches = Array.from(match);

    matches.forEach((m) => {
      numbers.push({ number, index: m.index });
    });
  });

  // Pass numbers with lowest and highest index as [first, last];
  const first = numbers.reduce((prev, curr) => {
    if (curr.index <= prev.index) return curr;
    return prev;
  }, numbers[0]).number;

  const last = numbers.reduce((prev, curr) => {
    if (curr.index >= prev.index) return curr;
    return prev;
  }, numbers[0]).number;

  return getFirstLast([first, last]);
}

const total = lines.reduce((acc, line) => {
  return acc + removeLetters(line);
}, 0);

const totalWithSpelled = lines.reduce((acc, line) => {
  return acc + removeLettersKeepSpelledNumbers(line);
}, 0);

console.log({ total, totalWithSpelled });
