const input = require('./day12_input');
const test = `0 <-> 2
1 <-> 1
2 <-> 0, 3, 4
3 <-> 2, 4
4 <-> 2, 3, 6
5 <-> 6
6 <-> 4, 5`;

function parse(s) {
  return s.split('\n').map(line =>
    line
      .split(' <-> ')[1]
      .split(', ')
      .map(Number)
  );
}

function getConnectedNodes(graph, node) {
  const connectedNodes = new Set();
  const queue = [node];

  while (queue.length > 0) {
    const n = queue.shift();
    connectedNodes.add(n);
    graph[n]
      .filter(node => !connectedNodes.has(node))
      .forEach(node => queue.push(node));
  }

  return connectedNodes;
}

function countGroups(graph) {
  const nodesCounted = new Set();
  let groups = 0;

  for (let node = 0; node < graph.length; node++) {
    if (nodesCounted.has(node)) continue;

    let queue = [node];
    while (queue.length > 0) {
      let n = queue.shift();
      nodesCounted.add(n);
      graph[n].filter(m => !nodesCounted.has(m)).forEach(m => queue.push(m));
    }

    groups++;
  }

  return groups;
}

const graph = parse(input);
console.log(getConnectedNodes(graph, 0).size);
console.log(countGroups(graph));
