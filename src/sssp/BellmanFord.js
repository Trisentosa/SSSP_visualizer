class BellmanFord {
  // W: 2D matrix containing weight of path
  constructor(W) {
    this.W = W;
  }

  // D: list of distance from source vertex to vertex i
  // spt: shortest path tree
  getsAllEdges() {
    let W = this.W;
    let n = W.length;
    let edges = [];
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (W[i][j] < Infinity && W[i][j] > 0) {
          edges.push([i, j]);
        }
      }
    }
    return edges;
  }

  getPath(P, i, s) {
    if (i == s) {
      return [s];
    }

    let current = P[i];
    let sp = [i];
    while (current != s) {
      sp.push(current);
      current = P[current];
    }
    sp.push(s);
    sp = sp.reverse();
    return sp;
  }

  // s: starting vertex index
  // D: list of weight from vsource to vi (out)
  // P : list of 'path from' for vi (out)
  run(s) {
    let solvable = true;
    let steps = [];
    //initialize values
    let W = this.W;
    let n = W.length;
    let D = [...Array(n).fill(Infinity)];
    let P = [...Array(n).fill(s)];
    D[s] = 0;
    let edges = this.getsAllEdges(W);

    //bellman ford iterates its operation |V|-1 times
    for (let i = 0; i < n; i++) {
      for (let e of edges) {
        let dist = W[e[0]][e[1]];

        steps.push(`${e[0]}${e[1]}t`);
        // performs relaxation if there is path to u (not Infinity)
        if (D[e[0]] !== Infinity && D[e[0]] + dist < D[e[1]]) {
          D[e[1]] = D[e[0]] + dist;
          P[e[1]] = e[0];
        }
      }
    }

    //check for negative cycle
    for (let e of edges) {
      let dist = W[e[0]][e[1]];
      if (D[e[0]] !== Infinity && D[e[0]] + dist < D[e[1]]) {
        solvable = false;
      }
    }

    let paths = [];
    //add paths
    for (let i = 0; i < n; i++) {
      paths.push(this.getPath(P, i, s));
    }

    return { D, P, solvable, steps, paths };
  }
}

export default BellmanFord;
