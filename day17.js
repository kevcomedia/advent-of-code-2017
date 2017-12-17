const input = 301;

function part1() {
  const buffer = [0];
  let pos = 0;
  for (let i = 1; i <= 2017; i++) {
    pos = (pos + input + 1) % buffer.length;
    buffer.splice(pos + 1, 0, i);
  }
  const idx = buffer.indexOf(2017);
  return buffer[(idx + 1) % buffer.length];
}

function part2() {
  let pos = 0;
  let curr;
  for (let size = 1; size <= 5e7; size++) {
    pos = (pos + input + 1) % size;
    if (pos == 0) {
      curr = size;
    }
  }
  return curr;
}

console.log(part1());
console.log(part2());
