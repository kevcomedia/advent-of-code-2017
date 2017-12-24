const input = require('fs')
  .readFileSync('./day23_input', 'utf8')
  .trim();

const registers = [...'abcdefgh'].reduce((a, b) => ((a[b] = 0), a), {});

const instructions = input.split('\n');
let muls = 0;
for (let i = 0; i < instructions.length; i++) {
  const [op, x, y] = instructions[i].split(' ');
  const val = /[-0-9]/.test(y) ? +y : registers[y];

  switch (op) {
    case 'set':
      registers[x] = val;
      break;
    case 'sub':
      registers[x] -= val;
      break;
    case 'mul':
      registers[x] *= val;
      muls++;
      break;
    case 'jnz':
      if (/[-0-9]/.test(x) && +x != 0) {
        i += val - 1;
      } else if (registers[x] != 0) {
        i += val - 1;
      }
      break;
  }
}

console.log(muls);
