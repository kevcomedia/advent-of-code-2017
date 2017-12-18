const input = require('fs')
  .readFileSync('./day18_input', 'utf8')
  .trim();

const test = `snd 1
snd 2
snd p
rcv a
rcv b
rcv c
rcv d`;

const registers = [{p: 0}, {p: 1}];
const queues = [[], []];
const counters = [0, 0];
let active = 0;
let terminated = false;
const instructions = input.split('\n');
let count = 0;
let zz = 0;
const states = new Set();

while (!terminated) {
  if (zz == 1e6) {
    console.log('stop');
    break;
  }
  zz++;

  let [op, x, y] = instructions[counters[active]].split(' ');
  const activeReg = registers[active];

  if (counters.every(c => c >= instructions.length)) {
    break;
  }

  if (counters[active] >= instructions.length) {
    active = (active + 1) % 2;
    continue;
  }

  switch (op) {
    case 'set':
      var n = /[-0-9]/.test(y) ? +y : activeReg[y];
      activeReg[x] = n;
      counters[active] += 1;
      break;
    case 'add':
      var n = /[-0-9]/.test(y) ? +y : activeReg[y];
      activeReg[x] += n;
      counters[active] += 1;
      break;
    case 'mul':
      var n = /[-0-9]/.test(y) ? +y : activeReg[y];
      activeReg[x] *= n;
      counters[active] += 1;
      break;
    case 'mod':
      var n = /[-0-9]/.test(y) ? +y : activeReg[y];
      activeReg[x] %= n;
      counters[active] += 1;
      break;
    case 'jgz':
      var n = /[-0-9]/.test(x) ? +x : activeReg[x] || 0;
      var nn = /[-0-9]/.test(y) ? +y : activeReg[y] || 0;
      if (n > 0) {
        counters[active] += nn;
      } else {
        counters[active] += 1;
      }
      break;
    case 'snd':
      var n = /[-0-9]/.test(x) ? +x : activeReg[x];
      queues[active].push(n);
      if (active == 1) count++;
      counters[active] += 1;
      break;
    case 'rcv':
      var other = queues[(active + 1) % 2];
      if (other.length == 0) {
        active = (active + 1) % 2;
      } else {
        var r = other.shift();
        activeReg[x] = r;
        counters[active] += 1;
      }
      break;
  }
}

console.log(count);
