const input = require('./day08_input');
const test = `b inc 5 if a > 1
a inc 1 if b < 5
c dec -10 if a >= 1
c inc -20 if c == 10`;

function createOpFn(op, val) {
  switch (op) {
    case '==': return (x) => x == val;
    case '!=': return (x) => x != val;
    case '<': return (x) => x < val;
    case '<=': return (x) => x <= val;
    case '>': return (x) => x > val;
    case '>=': return (x) => x >= val;
  };
}

function produceRegisters(instructionString) {
  return instructionString.split('\n')
    .reduce((registers, line) =>
      (registers[line.match(/^\w+/)] = 0, registers), {});
}

function parseInstructionString(instructionString) {
  return instructionString.split('\n')
    .map((line) => {
      const [name, mode, modeVal] = line.split(' ');
      const [predReg, op, predVal] = line.split(' if ')[1].split(' ');

      return {
        name,
        delta: mode == 'inc' ? +modeVal : -(+modeVal),
        predicate: {
          reg: predReg,
          op: createOpFn(op, +predVal)
        }
      };
    });
}

function execKeepMax(instructions, registers) {
  let max = Number.MIN_SAFE_INTEGER;

  instructions.forEach((instruction) => {
    if (instruction.predicate.op(registers[instruction.predicate.reg])) {
      registers[instruction.name] += instruction.delta;
      max = Math.max(max, registers[instruction.name]);
    }
  });

  return max;
}

function maxValue(registers) {
  return Math.max(...Object.keys(registers).map((k) => registers[k]));
}

const instructionString = input;

const registers = produceRegisters(instructionString);
const instructions = parseInstructionString(instructionString);

const max = execKeepMax(instructions, registers);

console.log({max, registers});
