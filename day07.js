const input = require('./day07_input');
const test = `pbga (66)
xhth (57)
ebii (61)
havc (66)
ktlj (57)
fwft (72) -> ktlj, cntj, xhth
qoyq (66)
padx (45) -> pbga, havc, qoyq
tknk (41) -> ugml, padx, fwft
jptl (61)
ugml (68) -> gyxo, ebii, jptl
gyxo (61)
cntj (57)`;

function parse(serialized) {
  const pp = serialized.split('\n').map((p) => {
    const tokens = p.split(' ');
    const children = tokens.includes('->') ? p.slice(p.indexOf('->') + 3).split(', ') : [];
    return {
      name: tokens[0],
      weight: +tokens[1].slice(1, tokens[1].length -1),
      children
    };
  });

  return toTree(pp);
}

function toTree(parsed) {
  let root;
  for (let i = 0; i < parsed.length; i++) {
    const p = parsed[i];
    const r = parsed.find((x) => x.children.includes(p.name));
    if (r == undefined) {
      root = p;
    } else {
      const idx = r.children.indexOf(p.name);
      r.children[idx] = p;
    }
  }
  return root;
}

function findBottom(tree) {
  return tree.name;
}

function sumWeights(tree) {
  return tree.weight + tree.children.reduce((a, b) => a + sumWeights(b), 0);
}

function findUnbalancedChild(children) {
  for (let i = 0; i < children.length; i++) {
    let sum = 0;
    let sample;
    for (let j = 0; j < children.length; j++) {
      if (i == j) continue;
      const sw = sumWeights(children[j]);
      sample = sw;
      sum += sample;
    }
    const average = sum / (children.length - 1);

    if (average == sample) {
      return {
        child: children[i],
        weightSum: sumWeights(children[i]),
        normal: sample,
      };
    }
  }
}

function findUnbalancedProgram(tree) {
  const unbalancedChild = findUnbalancedChild(tree.children);

  const subchildrenSums = unbalancedChild.child.children.map(sumWeights);
  const average = subchildrenSums.reduce((a, b) => a + b, 0) / subchildrenSums.length;

  if (average == subchildrenSums[0]) {
    return unbalancedChild;
  } else {
    return findUnbalancedProgram(unbalancedChild.child);
  }
}

function correctWeight({child, weightSum, normal}) {
  return child.weight - (weightSum - normal);
}

const tree = parse(input);
console.log(correctWeight(findUnbalancedProgram(tree)));
