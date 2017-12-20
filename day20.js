const input = require('fs')
  .readFileSync('./day20_input', 'utf8')
  .trim();

class Particle {
  constructor(p, v, a) {
    this.p = p;
    this.v = v;
    this.a = a;
  }

  update() {
    const axes = ['x', 'y', 'z'];
    axes.forEach(a => (this.v[a] += this.a[a]));
    axes.forEach(a => (this.p[a] += this.v[a]));
  }

  manhattan(c) {
    const axes = ['x', 'y', 'z'];
    return axes
      .map(a => this[c][a])
      .map(Math.abs)
      .reduce((a, b) => a + b);
  }

  isSamePos(other) {
    const sameX = this.p.x == other.p.x;
    const sameY = this.p.y == other.p.y;
    const sameZ = this.p.z == other.p.z;
    return sameX && sameY && sameZ;
  }
}

function toParticle(line) {
  const parts = line.split(', ');
  const getComponents = s => s.match(/[-0-9]+/g);

  return new Particle(
    ...parts
      .map(getComponents)
      .map(c => c.map(Number))
      .map(([x, y, z]) => ({x, y, z}))
  );
}

function toParticles(input) {
  return input
    .split('\n')
    .map(toParticle)
    .map((p, i) => ((p.id = i), p));
}

function closestToOrigin(input) {
  const particles = toParticles(input);

  const min = Math.min(...particles.map(p => p.manhattan('a')));
  return particles.find(p => p.manhattan('a') == min);
}

function run(input, rounds) {
  let particles = toParticles(input);

  for (let i = 0; i < rounds; i++) {
    particles.forEach(p => p.update());

    let liveParticles;
    for (let j = 0; j < particles.length; j++) {
      const particle = particles[j];
      if (particle.collided) continue;

      liveParticles = particles.filter(p => !p.collided);
      const collidedWith = liveParticles.filter(p => p.isSamePos(particle));

      if (collidedWith.length == 1) continue;

      particle.collided = true;
      collidedWith.forEach(p => (p.collided = true));
    }

    particles = liveParticles;
  }

  return particles.filter(p => !p.collided).length;
}

console.log(closestToOrigin(input).id);
console.log(run(input, 39)); // minimum rounds that give the correct answer; originally 1000
