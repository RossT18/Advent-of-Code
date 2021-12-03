const fs = require('fs');

function readInput() {
  try {
    const data = fs.readFileSync('/Users/rosstinsley/Documents/Personal/Advent-of-Code/2021/input/Day_2.txt', 'utf8');
    return data.split('\n');
  } catch (error) {
    console.error(error);
  }
}

function part1(commands) {
  const result = commands.reduce(([horizontal, depth], command) => {
    
    let magnitude = parseInt(command.split(" ")[1]);
    if (command.startsWith("forward")) {
      return [horizontal + magnitude, depth];
    } else {
      if (command.startsWith("up")) magnitude *= -1;
      return [horizontal, depth + magnitude];
    }
  
  }, [0, 0]);

  return result[0] * result[1];
}

function part2(commands) {
  const result = commands.reduce(([horizontal, depth, aim], command) => {
    
    let magnitude = parseInt(command.split(" ")[1]);
    if (command.startsWith("forward")) {
      return [horizontal + magnitude, depth + (magnitude * aim), aim];
    } else {
      if (command.startsWith("up")) magnitude *= -1;
      return [horizontal, depth, aim + magnitude];
    }

  }, [0, 0, 0]);

  return result[0] * result[1];
}

let commands = readInput();

console.log('Part 1:', part1(commands));
console.log('Part 2:', part2(commands));