const input = require('./day09_input');
const assert = require('assert');

function removeIgnoredChars(stream) {
  return stream.replace(/!./g, '');
}

assert.equal(removeIgnoredChars('<{!>}>'), '<{}>');
assert.equal(removeIgnoredChars('<!!>'), '<>');
assert.equal(removeIgnoredChars('<!!!>>'), '<>');
assert.equal(removeIgnoredChars('{{<!>},{<!>},{<!>},{<a>},{<a>}}'), '{{<},{<},{<},{<a>},{<a>}}');

function removeGarbage(stream) {
  return stream.replace(/<.*?>/g, '');
}

assert.equal(removeGarbage(removeIgnoredChars('{<{},{},{{}}>}')), '{}');
assert.equal(removeGarbage(removeIgnoredChars('{{<!>},{<!>},{<!>},{<a>}}')), '{{}}');
assert.equal(removeGarbage(removeIgnoredChars('{{<!>},{<!>},{<!>},{<a>},{<a>}}')), '{{},{}}');

function countGarbageChars(stream) {
  const garbage = stream.match(/<.*?>/g);
  return stream.length - removeGarbage(stream).length - 2 * garbage.length;
}

assert.equal(countGarbageChars(removeIgnoredChars('<>')), 0);
assert.equal(countGarbageChars(removeIgnoredChars('<random characters>')), 17);
assert.equal(countGarbageChars(removeIgnoredChars('<<<<>')), 3);
assert.equal(countGarbageChars(removeIgnoredChars('<{!>}>')), 2);
assert.equal(countGarbageChars(removeIgnoredChars('<!!>')), 0);
assert.equal(countGarbageChars(removeIgnoredChars('<!!!>>')), 0);
assert.equal(countGarbageChars(removeIgnoredChars('<{o"i!a,<{i<a>')), 10);

function countScore(stream) {
  let score = 0;
  let depth = 0;
  for (const c of stream) {
    if (c == '{') {
      depth++
    } else if (c == '}') {
      score += depth--;
    }
  }
  return score;
}

function f(stream) {
  const sanitizedStream = removeIgnoredChars(stream);
  return {
    score: countScore(removeGarbage(sanitizedStream)),
    garbage: countGarbageChars(sanitizedStream),
  };
}

  /*
assert.equal(f('{}'), 1);
assert.equal(f('{{{}}}'), 6);
assert.equal(f('{{},{}}'), 5);
assert.equal(f('{{{},{},{{}}}}'), 16);
assert.equal(f('{<a>,<a>,<a>,<a>}'), 1);
assert.equal(f('{{<ab>},{<ab>},{<ab>},{<ab>}}'), 9);
assert.equal(f('{{<!!>},{<!!>},{<!!>},{<!!>}}'), 9);
assert.equal(f('{{<a!>},{<a!>},{<a!>},{<ab>}}'), 3);
*/

console.log(f(input));
