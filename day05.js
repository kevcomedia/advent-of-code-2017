const offsets = require('./day05_input');

function stepsToExit(offsets) {
  let pointer = 0;
  let steps = 0;

  while (pointer < offsets.length) {
    const old = pointer;
    pointer += offsets[pointer];
    if (offsets[old] >= 3)
      offsets[old]--;
    else
      offsets[old]++;
    steps++;
  }
  return steps;
}

console.log(stepsToExit(offsets));
