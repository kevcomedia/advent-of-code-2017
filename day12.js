const input = require('./day12_input');
const test = `0 <-> 2
1 <-> 1
2 <-> 0, 3, 4
3 <-> 2, 4
4 <-> 2, 3, 6
5 <-> 6
6 <-> 4, 5`;

function parse(s) {
  return s.split('\n').map(line => {
    const tokens = line.split(' <-> ');
    const to = tokens[1].split(', ').map(Number);
    return to;
  });
}

function connectedTo(nodes, node) {
  let count = 0;
  let connectedNodes = new Set();
  const queue = [node];

  while (queue.length > 0) {
    let n = queue.shift();
    connectedNodes.add(n);
    nodes[n].forEach(m => {
      if (!connectedNodes.has(m)) {
        queue.push(m);
      }
    });
  }

  return connectedNodes.size;
}

function groups(nodes) {
  let nodesCopy = nodes.slice(0);
  let count = nodes.length;
  let counted = new Set();

  let groups = 0;
  for (let i = 0; i < nodesCopy.length; i++) {
    if (counted.has(i)) continue;

    let connected = new Set();
    let queue = [i];
    while (queue.length > 0) {
      let n = queue.shift();
      connected.add(n);
      counted.add(n);
      nodesCopy[n].forEach(x => {
        if (!connected.has(x)) {
          queue.push(x);
        }
      });
    }

    groups++;
  }

  return groups;
}

console.log(groups(parse(input), 0));
