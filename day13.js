const input = require('fs')
  .readFileSync('./day13_input', 'utf8')
  .trim();

const test = `0: 3
1: 2
4: 4
6: 4`;

const x = input;

function createSnapshotAt(ps, x) {
  const firewall = [];

  for (let line of x.split('\n')) {
    const tokens = line.split(': ');
    const n = +tokens[0];
    const layer = Array(+tokens[1]).fill(false);
    layer[0] = true;
    firewall[n] = layer;
  }

  for (let j = 0; j < firewall.length; j++) {
    if (!firewall[j]) continue;

    firewall[j] = Array(firewall[j].length).fill(false);
    const x = 2 * (firewall[j].length - 1);
    const n = ps % x;

    if (n < firewall[j].length - 1) {
      firewall[j][n] = true;
    } else {
      firewall[j][
        firewall[j].length - 1 - (n - (firewall[j].length - 1))
      ] = true;
    }
  }

  return firewall;
}

let delay = 0;
while (true) {
  const firewall = createSnapshotAt(delay, x);
  let success = true;

  for (let i = delay; i < firewall.length + delay; i++) {
    if (firewall[i - delay] && firewall[i - delay][0]) {
      success = false;
      break;
    }

    for (let j = 0; j < firewall.length; j++) {
      if (!firewall[j]) continue;

      firewall[j] = Array(firewall[j].length).fill(false);
      const x = 2 * (firewall[j].length - 1);
      const n = (i + 1) % x;

      if (n < firewall[j].length - 1) {
        firewall[j][n] = true;
      } else {
        firewall[j][
          firewall[j].length - 1 - (n - (firewall[j].length - 1))
        ] = true;
      }
    }
  }

  if (success) break;

  delay++;
}

console.log(delay);
