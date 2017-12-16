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
    return this;
  },
  x(a, b) {
    [this[a], this[b]] = [this[b], this[a]];
    return this;
  },
  p(a, b) {
    const i = this.indexOf(a);
    const j = this.indexOf(b);
    return ops.x.call(this, i, j);
  },
};

function optimize(instructions, size) {
  const p = Array.from({length: size}, (_, i) => i);

  instructions.forEach(ins => ins.op.apply(p, ins.vals));
  return function(programs) {
    const q = [];
    for (let i = 0; i < p.length; i++) {
      q.push(programs[p[i]]);
    }
    return q;
  };
}

const size = 16;
const instructions = toInstructions(input);
const optimized = optimize(instructions, size);
const programs = Array.from({length: size}, (_, i) =>
  String.fromCharCode(i + 'a'.charCodeAt())
);

// instructions.forEach(ins => ins.op.apply(programs, ins.vals));
let p = programs;
for (let i = 0; i < 1e9; i++) {
  p = optimized(p);
}
console.log(p);
