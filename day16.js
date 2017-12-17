const input = require('fs')
  .readFileSync('./day16_input', 'utf8')
  .trim();

function toInstructions(input) {
  return input.split(',').map(line => {
    switch (line[0]) {
      case 's':
        return {
          op: ops.s,
          vals: [+line.slice(1)],
        };
      case 'x':
        return {
          op: ops.x,
          vals: line
            .slice(1)
            .split('/')
            .map(Number),
        };
      case 'p':
        return {
          op: ops.p,
          vals: line.slice(1).split('/'),
        };
    }
  });
}

const ops = {
  s(n) {
    for (let i = 0; i < n; i++) {
      this.unshift(this.pop());
    }
  },
  x(a, b) {
    [this[a], this[b]] = [this[b], this[a]];
  },
  p(a, b) {
    const i = this.indexOf(a);
    const j = this.indexOf(b);
    ops.x.call(this, i, j);
  },
};

const instructions = toInstructions(input);

function exec(instructions, {size = 16, rounds = 1} = {}) {
  const programs = Array.from({length: size}, (_, i) =>
    String.fromCharCode(i + 'a'.charCodeAt())
  );

  const states = [];

  for (let i = 0; i < rounds; i++) {
    if (states.includes(programs.join(''))) {
      const idx = (rounds - states.length) % states.length;
      return states[idx];
    }

    states.push(programs.join(''));
    instructions.forEach(ins => ins.op.apply(programs, ins.vals));
  }

  return programs.join('');
}

console.log(exec(instructions));
console.log(exec(instructions, {rounds: 1e9}));
