class Graph {
  constructor() {
    this.nodes = new Map();
  }

  addNode(position) {
    this.nodes.set(position.toString(), []);
  }

  addEdge(start, end) {
    this.nodes.get(start.toString()).push(end);
    this.nodes.get(end.toString()).push(start);
  }

  getNeighbors(position) {
    return this.nodes.get(position.toString());
  }
}

class KnightMovesMapper {
  constructor(graph, start, end) {
    this.graph = graph;
    this.start = start;
    this.end = end;
    this.visited = new Set();
  }

  mapMoves(position) {
    const neighbors = this.graph.getNeighbors(position);
    return neighbors.filter(
      (neighbor) => !this.visited.has(neighbor.toString())
    );
  }

  findShortestPath() {
    const queue = [[this.start]];
    this.visited.add(this.start.toString());

    while (queue.length > 0) {
      const path = queue.shift();
      const current = path[path.length - 1];

      if (current[0] === this.end[0] && current[1] === this.end[1]) {
        console.log(
          `You made it in ${path.length - 1} moves! Here's your path:`
        );
        path.forEach((step) => console.log(step));
        return;
      }

      const neighbors = this.mapMoves(current);
      for (const neighbor of neighbors) {
        const newPath = [...path, neighbor];
        queue.push(newPath);
        this.visited.add(neighbor.toString());
      }
    }

    console.log("No valid path found.");
  }
}

// Usage
const graph = new Graph();
const start = [1, 1];
const end = [3, 3];

// Add nodes to the graph
for (let i = 0; i <= Math.max(...end); i++) {
  for (let j = 0; j <= Math.max(...end); j++) {
    graph.addNode([i, j]);
  }
}

// Add edges to represent valid knight moves
for (let i = 0; i <= Math.max(...end); i++) {
  for (let j = 0; j <= Math.max(...end); j++) {
    const moves = [
      [i + 2, j + 1],
      [i + 1, j + 2],
      [i - 1, j + 2],
      [i - 2, j + 1],
      [i - 2, j - 1],
      [i - 1, j - 2],
      [i + 1, j - 2],
      [i + 2, j - 1],
    ];

    for (const move of moves) {
      if (
        move[0] >= 0 &&
        move[0] <= Math.max(...end) &&
        move[1] >= 0 &&
        move[1] <= Math.max(...end)
      ) {
        graph.addEdge([i, j], move);
      }
    }
  }
}

const knightMapper = new KnightMovesMapper(graph, start, end);
knightMapper.findShortestPath();
