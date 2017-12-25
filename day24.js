const input = require('fs')
  .readFileSync('./day24_input', 'utf8')
  .trim();

const test = `0/2
2/2
2/3
3/4
3/5
0/1
10/1
9/10`;

const parts = input.split('\n').map(p => ({
  pins: new Set(p.split('/').map(Number)),
  used: false,
}));

function computePartStrength(part) {
  const pins = [...part];
  return pins.length == 2 ? pins[0] + pins[1] : 2 * pins[0];
}

function getOtherPin(part, pin) {
  if (part.pins.size == 1) {
    return pin;
  }

  const pins = [...part.pins];
  return pin == pins[0] ? pins[1] : pins[0];
}

function calculateStrongest(parts, start = 0, total = 0) {
  const unusedParts = parts.filter(p => !p.used).filter(p => p.pins.has(start));
  if (unusedParts.length == 0) {
    return total;
  }

  let max = 0;

  for (let i = 0; i < unusedParts.length; i++) {
    const part = unusedParts[i];
    const end = getOtherPin(part, start);
    part.used = true;
    max = Math.max(max, calculateStrongest(parts, end, total + start + end));
    part.used = false;
  }

  return max;
}

function getBridges(parts, start = 0, bridges = [], currBridge = []) {
  const unusedParts = parts.filter(p => !p.used).filter(p => p.pins.has(start));
  if (unusedParts.length == 0) {
    bridges.push(currBridge.slice());
  }

  for (let i = 0; i < unusedParts.length; i++) {
    const part = unusedParts[i];
    const end = getOtherPin(part, start);
    currBridge.push(part);
    part.used = true;
    getBridges(parts, end, bridges, currBridge);
    currBridge.pop();
    part.used = false;
  }
  return bridges;
}

function getLongestBridges(parts) {
  const bridges = getBridges(parts);
  const maxDepth = bridges.reduce(
    (depth, bridge) => Math.max(depth, bridge.length),
    0
  );

  const longestBridges = bridges.filter(b => b.length == maxDepth);
  return longestBridges.reduce(
    (strength, bridge) => Math.max(strength, calculateStrongest(bridge)),
    0
  );
}

console.log(calculateStrongest(parts));
console.log(getLongestBridges(parts));
