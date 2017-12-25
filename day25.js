const steps = 12586542;
const tape = {};

let cursor = 0;
let state = 'A';

for (let i = 0; i < steps; i++) {
  const val = tape[cursor] || 0;
  switch (state) {
    case 'A':
      if (val == 0) {
        tape[cursor] = 1;
        cursor++;
        state = 'B';
      } else {
        tape[cursor] = 0;
        cursor--;
        state = 'B';
      }
      break;

    case 'B':
      if (val == 0) {
        tape[cursor] = 0;
        cursor++;
        state = 'C';
      } else {
        tape[cursor] = 1;
        cursor--;
        state = 'B';
      }
      break;

    case 'C':
      if (val == 0) {
        tape[cursor] = 1;
        cursor++;
        state = 'D';
      } else {
        tape[cursor] = 0;
        cursor--;
        state = 'A';
      }
      break;

    case 'D':
      if (val == 0) {
        tape[cursor] = 1;
        cursor--;
        state = 'E';
      } else {
        tape[cursor] = 1;
        cursor--;
        state = 'F';
      }
      break;

    case 'E':
      if (val == 0) {
        tape[cursor] = 1;
        cursor--;
        state = 'A';
      } else {
        tape[cursor] = 0;
        cursor--;
        state = 'D';
      }
      break;

    case 'F':
      if (val == 0) {
        tape[cursor] = 1;
        cursor++;
        state = 'A';
      } else {
        tape[cursor] = 1;
        cursor--;
        state = 'E';
      }
      break;
  }
}

console.log(Object.keys(tape).map(k => tape[k]).filter(v => v).length);
