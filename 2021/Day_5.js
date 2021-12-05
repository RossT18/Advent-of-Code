const fs = require('fs');

function readInput() {
  try {
    const data = fs.readFileSync('/Users/rosstinsley/Documents/Personal/Advent-of-Code/2021/input/Day_5.txt', 'utf8');
    return data.split('\n');
  } catch (error) {
    console.error(error);
  }
}

const linesRaw = readInput();

function fillPoints(difference) {
  let newPoints = [];
  if (difference[0] > difference[1]) {
    for (let i = difference[0]; i >= difference[1]; i--) {
      newPoints.push(i)
    }
  } else {
    for (let i = difference[0]; i < difference[1] + 1; i++) {
      newPoints.push(i);
    }
  }
  return newPoints;
}

function buildDiagram(width, height) {
  let diagram = [];
  
  for (let i = 0; i < height; i++) {
    let row = [];
    for (let j = 0; j < width; j++) {
      row.push(0)
    }
    diagram.push(row);
  }

  return diagram;
}

function getLines() {
  const lines = linesRaw.map(lr => {
    const [one, two] = lr.split(" -> ");
    const [x1, y1] = one.split(",").map(Number);
    const [x2, y2] = two.split(",").map(Number);

    return {
      'x': [x1, x2],
      'y': [y1, y2],
      'diagonal': x1 !== x2 && y1 !== y2
    }
  });

  return lines;
}

function countDangerousAreas(diagram) {
  const threshold = 2;
  let count = 0;
  diagram.forEach(row => {
    row.forEach(v => {
      if (v >= threshold) count++;
    })
  });
  
  return count;
}

function part1() {
  const linesNoDiagonals = getLines().filter(line => !line.diagonal);
  
  // let diagram = new Array(getLargestXY()[0]).fill(new Array(getLargestXY()[1]).fill(0));
  let diagram = buildDiagram(1000, 1000);
  
  linesNoDiagonals.forEach(line => {
    const xs = fillPoints(line.x);
    const ys = fillPoints(line.y);
  
    xs.forEach(x => {
      ys.forEach(y => {
        diagram[y][x]++;
      })
    });
  });
  
  return countDangerousAreas(diagram);
}

function part2() {
  const lines = getLines();
  let diagram = buildDiagram(1000, 1000);

  lines.forEach(line => {
    let points = [];
    const xs = fillPoints(line.x), ys = fillPoints(line.y);

    // Merge xs and ys so points work with diagonal, horizontal, and vertical
    if (!line.diagonal) {
      xs.forEach(x => {
        ys.forEach(y => {
          points.push([x, y]);
        });
      });
    } else {
      // This loop cannot be nested like above
      for (let i = 0; i < xs.length; i++) {
        points.push([xs[i], ys[i]]);
      }
    }

    points.forEach(point => {
      diagram[point[1]][point[0]]++
    });
  });

  return countDangerousAreas(diagram);
}

console.log("Part 1:", part1());
console.log("Part 2:", part2());