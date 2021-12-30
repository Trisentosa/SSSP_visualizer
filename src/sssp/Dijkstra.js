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

  // s: starting vertex index
  // D: list of weight from vsource to vi (out)
  // P : list of 'path from' for vi (out)
  run(s) {
    let W = this.W;
    //initialize values
    let n = W.length;
    let spt = []; //spt: shortest path tree
    let D = W[s];
    let P = [...Array(n).fill(s)];

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
    return [D, P];
  }
}

export default Dijkstra;
