import fs from 'fs';

export function readDataRaw(dayNumber: number): string {
  try {
    return fs.readFileSync(
      `/Users/rosstinsley/Documents/Personal/Advent-of-Code/2022/data/Day_${dayNumber}.txt`,
      'utf8',
    );
  } catch (error) {
    console.error(error);
  }
}

export function readDataArray(dayNumber: number): string[] {
  return readDataRaw(dayNumber).split('\n');
}
