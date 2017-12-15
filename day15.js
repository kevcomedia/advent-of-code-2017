const test = {
  a: 65,
  b: 8921,
};

const input = {
  a: 634,
  b: 301,
};

const x = input;

const factors = {
  a: 16807,
  b: 48271,
};

function* generator(seed, factor, mult) {
  let next = (seed * factor) % 2147483647;
  while (true) {
    if (next % mult === 0) yield next;
    next = (next * factor) % 2147483647;
  }
}

function rightmost16Match(a, b) {
  return (a & 0x0000ffff) === (b & 0x0000ffff);
}

function countMatches(rounds, mults = {a: 1, b: 1}) {
  const genA = generator(x.a, factors.a, mults.a);
  const genB = generator(x.b, factors.b, mults.b);

  let matches = 0;
  for (let i = 0; i < rounds; i++) {
    const a = genA.next().value;
    const b = genB.next().value;

    if (rightmost16Match(a, b)) {
      matches++;
    }
  }

  return matches;
}

console.log(countMatches(40000000));
console.log(countMatches(5000000, {a: 4, b: 8}));
