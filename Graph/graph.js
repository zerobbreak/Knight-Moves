class Graph {
  constructor(noOfVertices) {
    this.noOfVertices = noOfVertices;
    this.AdjList = new Map();
  }

  // functions to be implemented

  // addVertex(v)
  addvertex(v) {
    // initialize the adjacent list with a
    // null array
    this.AdjList.set(v, []);
  }

  // addEdge(v, w)
  addEdge(v, w) {
    this.AdjList.get(v).push(w);

    this.AdjList.get(w).push(v);
  }
  // printGraph()
  printGraph() {
    // get all the vertices
    var get_keys = this.AdjList.keys();

    // iterate over the vertices
    for (var i of get_keys) {
      // get the corresponding adjacency list
      // for the vertex
      var get_values = this.AdjList.get(i);
      var conc = "";

      // iterate over the adjacency list
      // concatenate the values into a string
      for (var j of get_values) conc += j + " ";

      // print the vertex and its adjacency list
      console.log(i + " -> " + conc);
    }
  }
  // bfs(v)
  bfs(startNode) {
    const visited = {};

    const q = new Queue();

    // add the starting node to the queue
    visited[startNode] = true;
    q.enqueue(startNode);

    while (!q.isEmpty()) {
      const getQueueElement = q.dequeue();

      console.log(getQueueElement);

      const get_list = this.AdjList.get(getQueueElement);

      for (const i in get_list) {
        const neigh = get_list[i];

        if (!visited[neigh]) {
          visited[neigh] = true;
          q.enqueue(neigh);
        }
      }
    }
  }
  // dfs(v)
  dfs(startNode) {
    const visited = {};

    this.DFSUtil(startNode, visited);
  }

  DFSUtil(vert, visited) {
    visited[vert] = true;
    console.log(vert);

    const get_neighbours = this.AdjList.get(vert);
    for (const i in get_neighbours) {
      const get_elem = get_neighbours[i];
      if (!visited[get_elem]) this.DFSUtil(get_elem, visited);
    }
  }

  shortestPathDijkstra(start, end) {
    const distances = {};
    const previous = {};
    const priorityQueue = new Queue();

    for (const vertex of this.AdjList.keys()) {
      distances[vertex] = vertex === start ? 0 : Infinity;
      previous[vertex] = null;
      priorityQueue.enqueue(vertex, distances[vertex]);
    }

    while (!priorityQueue.isEmpty()) {
      const current = priorityQueue.dequeue();

      for (const neighbor of this.AdjList.get(current) || []) {
        const newDistance = distances[current] + 1; // Assuming unweighted graph

        if (newDistance < distances[neighbor]) {
          distances[neighbor] = newDistance;
          previous[neighbor] = current;
          priorityQueue.enqueue(neighbor, distances[neighbor]);
        }
      }
    }

    // Reconstruct the path
    const path = [];
    let current = end;
    while (current !== null) {
      path.unshift(current);
      current = previous[current];
    }

    return path.length > 1 ? path : null; // No path found or single-node path
  }
}

class Queue {
  constructor() {
    this.items = [];
  }

  // Functions to be implemented
  // enqueue(item)
  enqueue(element) {
    this.items.push(element);
  }
  // dequeue()
  dequeue() {
    if (this.isEmpty()) {
      return "Underflow";
    }
    return this.items.shift();
  }
  // peek()
  peek() {
    if (this.isEmpty()) {
      return "No elements in Queue";
    }
    return this.items[0];
  }
  // isEmpty()
  isEmpty() {
    return this.items.length == 0;
  }
  // printQueue()
  printQueue() {
    let str = "";
    for (let i = 0; i < this.items.length; i++) {
      str += this.items[i] + " ";
    }
    return str;
  }
}

// const queue = new Queue();
// // Testing dequeue and pop on an empty queue
// // returns Underflow
// console.log(queue.dequeue());

// // returns true
// console.log(queue.isEmpty());

// // Adding elements to the queue
// // queue contains [10, 20, 30, 40, 50]
// queue.enqueue(10);
// queue.enqueue(20);
// queue.enqueue(30);
// queue.enqueue(40);
// queue.enqueue(50);
// queue.enqueue(60);

// // returns 10
// console.log(queue.peek());

// // removes 10 from the queue
// // queue contains [20, 30, 40, 50, 60]
// console.log(queue.dequeue());

// // returns 20
// console.log(queue.peek());

// // removes 20
// // queue contains [30, 40, 50, 60]
// console.log(queue.dequeue());

// // printing the elements of the queue
// // prints [30, 40, 50, 60]
// console.log(queue.printQueue() + "\n");

const graph = new Graph(8);
const vertices = ["A", "B", "C", "D", "E", "F", "G", "H"];

for (let i = 0; i < vertices.length; i++) {
  graph.addvertex(vertices[i]);
}

graph.addEdge("A", "B");
graph.addEdge("A", "D");
graph.addEdge("A", "E");
graph.addEdge("B", "C");
graph.addEdge("D", "E");
graph.addEdge("E", "F");
graph.addEdge("E", "C");
graph.addEdge("C", "F");
graph.addEdge("G", "F");
graph.addEdge("G", "E");
graph.addEdge("G", "A");
graph.addEdge("H", "A")
graph.addEdge("H", "D")
graph.addEdge("H", "F")

graph.printGraph();

console.log("\nBFS");
graph.bfs("A");

console.log("\nDFS");
graph.dfs("A");

console.log("\nShortest Path");
const shortestPath = graph.shortestPathDijkstra("A", "F");
console.log(shortestPath ? shortestPath.join(" -> ") : "No path found.");
