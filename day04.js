const input = require('./day04_input');
const assert = require('assert');

assert.equal(isValid('aa bb cc dd ee'), true);
assert.equal(isValid('aa bb cc dd aa'), false);
assert.equal(isValid('aa bb cc dd aaa'), true);

function isValid(passphrase) {
  const words = passphrase.split(' ');
  return words.length == [...new Set(words)].length;
}

assert.equal(isValidNoAnagrams('abcde fghij'), true);
assert.equal(isValidNoAnagrams('abcde xyz ecdab'), false);
assert.equal(isValidNoAnagrams('a ab abc abd abf abj'), true);
assert.equal(isValidNoAnagrams('iiii oiii ooii oooi oooo'), true);
assert.equal(isValidNoAnagrams('oiii ioii iioi iiio'), false);

function isValidNoAnagrams(passphrase) {
  const words = passphrase.split(' ');
  const sorted = words.map((word) => [...word].sort().join(''));
  return sorted.length == [...new Set(sorted)].length;
}

console.log(input.filter(isValidNoAnagrams).length);
