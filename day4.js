const input = require('fs').readFileSync('./day4_input.txt', 'utf8');
const rooms = input.split('\n');


// Part One
const valid = rooms.filter(r => {
  const [name, chksum] = r.match(/[a-z|-]+/g); 
  // Count characters
  const chars = {};
  name.split('').forEach(c => {
    if (c !== '-') {
      if (!(c in chars)) chars[c] = 0;
      chars[c]++;
    }
  });
  // Order characters by 1. occurences, 2. alphabetical
  const occurences = Object.keys(chars).sort((a, b) => {
    if (chars[a] === chars[b]) return a.charCodeAt(0) - b.charCodeAt(0); // If they're equal, alphabetical priority
    return chars[b] - chars[a];
  });
  return chksum.split('').every((c, i) => c === occurences[i]);
});

// Reduce Sum
const sectorSums = valid.reduce((sum, r) => sum + +(r.match(/\d+/)[0]), 0);
console.log(`Part One: ${sectorSums}`);


// Part Two
const names = valid.map(r => {
  const match = r.match(/\w+/g)
  let name = match.slice(0, match.length - 3).join(' ');
  const shift = +match[match.length - 2];
  name = name.split('').map(c => {
    if (c === ' ') return c;
    const charNum = c.charCodeAt(0) - 97; // 0-indexed number code, lowercase alphabet starts at 97
    return String.fromCharCode((charNum + shift) % 26 + 97);
  }).join('');
  return { name, shift };
});
console.log(`Part Two: ${names.find(n => n.name.indexOf('north') > -1).shift}`)