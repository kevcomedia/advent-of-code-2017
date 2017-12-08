const input = require('./day08_input');
const test = `b inc 5 if a > 1
a inc 1 if b < 5
c dec -10 if a >= 1
c inc -20 if c == 10`;

const ops = {
  '==': (x, y) => x == y,
  '!=': (x, y) => x != y,
  '<':  (x, y) => x < y,
  '<=': (x, y) => x <= y,
  '>':  (x, y) => x > y,
  '>=': (x, y) => x >= y,
};

function produceRegisters(instructionString) {
  return instructionString.split('\n')
    .reduce((registers, line) => {
      const registerName = line.split(' ')[0];
      registers[registerName] = 0;
    }, {});
  const registers = {};
  for (let ins of instructions.split('\n')) {
    const name = ins.split(' ')[0];
    registers[name] = 0;
  }
  return registers;
}

function parseInstructions(instructions) {
  return instructions.split('\n')
    .map((line) => {
      const tokens = line.split(' ');
      const name = tokens[0];
      const delta = tokens[1] == 'inc' ? +tokens[2] : -(+tokens[2]);
      const predTokens = line.split(' if ')[1].split(' ');
      const predicate = {
        reg: predTokens[0],
        op: ops[predTokens[1]],
        val: +predTokens[2],
      };
      return {name, delta, predicate};
    });
}

function execKeepMax(instructions, register) {
  let max = Number.MIN_SAFE_INTEGER;
  instructions.forEach((instruction) => {
    if (instruction.predicate.op(register[instruction.predicate.reg], instruction.predicate.val)) {
      register[instruction.name] += instruction.delta;
      max = Math.max(max, register[instruction.name]);
    }
  });

  return max;
}

function maxValue(registers) {
  return Math.max(...Object.keys(registers).map((k) => registers[k]));
}

const instructionString = input;

const registers = produceRegisters(instructionString);
const instructions = parseInstructions(instructionString);

const max = execKeepMax(instructions, registers);

console.log(max);
