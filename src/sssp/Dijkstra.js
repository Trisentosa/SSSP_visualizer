class Dijkstra {
  // W: 2D matrix containing weight of path
  constructor(W) {
    this.W = W;
  }

  // D: list of distance from source vertex to vertex i
  // spt: shortest path tree
  minDistance(D, spt) {
    let min = Infinity;
    let min_index = -1;
    let n = D.length; //nvertices

    for (let i = 0; i < n; i++) {
      if (D[i] < min && !spt.includes(i)) {
        min = D[i];
        min_index = i;
      }
    }
    return min_index;
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

  validate() {
    let W = this.W;
    let n = W.length;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (W[i][j] < 0) {
          return false;
        }
      }
    }
    return true;
  }

  // s: starting vertex index
  // D: list of weight from vsource to vi (out)
  // P : list of 'path from' for vi (out)
  run(s) {
    let W = this.W;
    let solvable = this.validate(W);
    let steps = [];

    //initialize values
    let n = W.length;
    let spt = []; //spt: shortest path tree
    let D = W[s];
    let P = [...Array(n).fill(s)];
    let paths = [];

    // iterates |V| times
    for (let i = 0; i < n; i++) {
      let mIndex = this.minDistance(D, spt);

      if (mIndex != -1) {
        spt.push(mIndex);
        //relaxation for adjacent nodes that is not in spt
        for (let j = 0; j < n; j++) {
          if (
            !spt.includes(j) &&
            W[mIndex][j] > 0 &&
            D[mIndex] + W[mIndex][j] < D[j]
          ) {
            D[j] = D[mIndex] + W[mIndex][j];
            P[j] = mIndex;
          }
        }
      }
    }

    //add paths
    for (let i = 0; i < n; i++) {
      paths.push(this.getPath(P, i, s));
    }

    return { D, P, solvable, steps, paths };
  }
}

export default Dijkstra;
