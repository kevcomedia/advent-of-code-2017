const input = require('fs')
  .readFileSync('./day24_input', 'utf8')
  .trim();

const parts = input.split('\n').map(p => ({
  pins: new Set(p.split('/').map(Number)),
  used: false,
}));

function getOtherPin(part, pin) {
  if (part.pins.size == 1) {
    return pin;
  }

  const pins = [...part.pins];
  return pin == pins[0] ? pins[1] : pins[0];
}

function getUnusedParts(parts, start) {
  return parts.filter(p => !p.used).filter(p => p.pins.has(start));
}

function calculateStrongest(parts, start = 0, total = 0) {
  const unusedParts = getUnusedParts(parts, start);
  if (unusedParts.length == 0) {
    return total;
  }

  return unusedParts.reduce((currMax, part) => {
    end = getOtherPin(part, start);
    part.used = true;
    const strength = calculateStrongest(parts, end, total + start + end);
    part.used = false;
    return Math.max(currMax, strength);
  }, 0);
}

function getBridges(parts, start = 0, bridges = [], currBridge = []) {
  const unusedParts = getUnusedParts(parts, start);
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
