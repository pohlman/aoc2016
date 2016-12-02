const input = 'R5, R4, R2, L3, R1, R1, L4, L5, R3, L1, L1, R4, L2, R1, R4, R4, L2, L2, R4, L4, R1, R3, L3, L1, L2, R1, R5, L5, L1, L1, R3, R5, L1, R4, L5, R5, R1, L185, R4, L1, R51, R3, L2, R78, R1, L4, R188, R1, L5, R5, R2, R3, L5, R3, R4, L1, R2, R2, L4, L4, L5, R5, R4, L4, R2, L5, R2, L1, L4, R4, L4, R2, L3, L4, R2, L3, R3, R2, L2, L3, R4, R3, R1, L4, L2, L5, R4, R4, L1, R1, L5, L1, R3, R1, L2, R1, R1, R3, L4, L1, L3, R2, R4, R2, L2, R1, L5, R3, L3, R3, L1, R4, L3, L3, R4, L2, L1, L3, R2, R3, L2, L1, R4, L3, L5, L2, L4, R1, L4, L4, R3, R5, L4, L1, L1, R4, L2, R5, R1, R1, R2, R1, R5, L1, L3, L5, R2';
const instructions = input.split(', ');


// Part One
(function(){
  const directionalActions = {
    0: n => { y += n }, // North
    1: n => { x += n }, // East
    2: n => { y -= n }, // South
    3: n => { x -= n }, // West
  };
  let x = 0;
  let y = 0;
  let dir = 0;

  instructions.forEach(inst => {
    // Direction
    if (inst[0] === 'R') {
      dir = dir === 3 ? 0 : dir + 1; // Turn Right
    } else {
      dir = dir === 0 ? 3 : dir - 1; // Turn Left
    }
    // Distance
    directionalActions[dir](+(inst.substring(1)));
  });
  console.log(`Part One: ${Math.abs(x) + Math.abs(y)}`);
})();


// Part Two
(function(){
  let dir = 0;
  let x = 0;
  let y = 0;
  const visited = {'0,0': true};

  function partTwo() {
    for (let i = 0; i < instructions.length; i++) {
      const inst = instructions[i];
      // Direction
      if (inst[0] === 'R') {
        dir = dir === 3 ? 0 : dir + 1; // Turn Right
      } else {
        dir = dir === 0 ? 3 : dir - 1; // Turn Left
      }
      // Walking
      for (let j = 0; j < +(inst.substring(1)); j++) {
        if (dir === 0)      y++; // North
        else if (dir === 1) x++; // East
        else if (dir === 2) y--; // South
        else                x--; // West
        // Check if visited after each step
        const key = `${x},${y}`;
        if (key in visited) {
          return Math.abs(x) + Math.abs(y);
        }
        visited[key] = true;
      }
    }
  }
  console.log(`Part Two: ${partTwo()}`);
})();