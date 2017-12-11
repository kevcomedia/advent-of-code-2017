const input = require('./day11_input');

const max = (a, b) => Math.max(a, b);

const x = input;
const parsed = x.split(',');

function maxDistance(parsed) {
  const path = parsed.slice(0);
  let ns = 0;
  let nesw = 0;
  let nwse = 0;

  let maxDistance = 0;
  for (let i = 0; i < path.length; i++) {
    switch (path[i]) {
      case 'n':
        ns++;
        break;
      case 's':
        ns--;
        break;
      case 'ne':
        nesw++;
        break;
      case 'nw':
        nwse++;
        break;
      case 'se':
        nwse--;
        break;
      case 'sw':
        nesw--;
        break;
    }

    let maxEdge;
    let center;

    if ((nesw >= 0 && nwse >= 0) || (nesw < 0 && nwse < 0)) {
      maxEdge = [nesw, nwse].map(Math.abs).reduce(max);
      center = Math.abs(ns);
    } else if ((ns >= 0 && nwse < 0) || (ns < 0 && nwse >= 0)) {
      maxEdge = [ns, nwse].map(Math.abs).reduce(max);
      center = Math.abs(nesw);
    } else {
      maxEdge = [ns, nesw].map(Math.abs).reduce(max);
      center = Math.abs(nwse);
    }

    maxDistance = Math.max(maxDistance, center + maxEdge);
  }

  return maxDistance;
}

console.log(maxDistance(parsed));
