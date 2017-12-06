const banks = require('./day06_input');

function infiniteLoopAt(banks) {
  let pos = 0;
  let isSeen = false;
  let seenAgainAfter = 0;
  let offender;
  const snaps = new Set();

  while (true) {
    pos++;

    const max = Math.max(...banks);
    const idxMax = banks.indexOf(max);
    banks[idxMax] = 0;

    let m = max;
    let i = (idxMax + 1) % banks.length;
    while (m > 0) {
      banks[i]++;
      m--;
      i = (i + 1) % banks.length;
    }

    if (!isSeen) {
      if (snaps.has(JSON.stringify(banks))) {
        isSeen = true;
        offender = JSON.stringify(banks);
      }
      snaps.add(JSON.stringify(banks));
    } else {
      seenAgainAfter++;
      if (offender == JSON.stringify(banks)) {
        return seenAgainAfter;
      }
    }
  }
}

console.log(infiniteLoopAt(banks));
