const input = require('fs').readFileSync('./day3_input.txt', 'utf8');


// Part One
(function() {
  const triangles = input.split('\n');
  const valid = triangles.filter(t => {
    const sides = t.trim().split(/\s+/).map(s => +s).sort((a, b) => a - b);
    return sides[0] + sides[1] > sides[2];
  });
  console.log(`Part One: ${valid.length}`);
})();


// Part Two
(function() {
  // Building triangles line-by-line, there's surely a cleaner
  // way about this, but it's only 1 iteration
  const lines = input.split('\n');
  const triangles = [];
  let a = [];
  let b = [];
  let c = [];
  lines.forEach((l, i) => {
    const sides = l.trim().split(/\s+/).map(s => +s);
    a.push(sides[0]);
    b.push(sides[1]);
    c.push(sides[2]);
    // Every 3 rows our triangles are complete
    if (i % 3 === 2) {
      triangles.push(a, b, c);
      a = []; b = []; c = [];
    }
  });
  const valid = triangles.filter(t => {
    const sides = t.sort((a, b) => a - b);
    return sides[0] + sides[1] > sides[2];
  });
  console.log(`Part Two: ${valid.length}`);
})();