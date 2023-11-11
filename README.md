# Knight Moves

## Introduction
The `knightMoves` function is designed to find the shortest possible way for a knight on a chessboard to move from one square to another. The chessboard is represented as a 2D grid with 2-dimensional coordinates. The goal is to output all squares the knight will stop on along the way.

## Function Signature
```javascript
knightMoves(startSquare, endSquare);
```

## Examples
- `knightMoves([0,0],[1,2])` returns `[[0,0],[1,2]]`
- `knightMoves([0,0],[3,3])` returns `[[0,0],[2,1],[3,3]]` or `[[0,0],[1,2],[3,3]]`
- `knightMoves([3,3],[0,0])` returns `[[3,3],[2,1],[0,0]]` or `[[3,3],[1,2],[0,0]]`
- `knightMoves([0,0],[7,7])` returns `[[0,0],[2,1],[4,2],[6,3],[4,4],[6,5],[7,7]]` or `[[0,0],[2,1],[4,2],[6,3],[7,5],[5,6],[7,7]]`

## Implementation Details
1. **Chessboard Representation:**
   - The chessboard is represented as a 2D grid with 2-dimensional coordinates.

2. **Tree Structure:**
   - Treat all possible moves the knight could make as children in a tree.
   - Each node in the tree represents a square on the chessboard.

3. **Search Algorithm:**
   - Breadth-First Search (BFS) is chosen as the search algorithm.
   - BFS is suitable for finding the shortest path in this case.

4. **Path Output:**
   - The function outputs the full path of squares the knight will stop on along the way.

5. **Script:**
   - A script is provided that creates a game board and a knight.
   - The script utilizes the `knightMoves` function to find and display the shortest path.

## How to Use
1. Import the `knightMoves` function.
2. Call the function with the starting and ending squares as arguments.
3. The function will return the shortest path with all squares the knight will stop on.
4. The script demonstrates the usage with examples.

```javascript
const { knightMoves } = require('./knightMoves');

// Example Usage
const path = knightMoves([3,3], [4,3]);
console.log(`You made it in ${path.length - 1} moves!  Here's your path:`);
path.forEach(square => console.log(square));
```

Feel free to explore different starting and ending squares to witness the efficiency of the shortest path finding algorithm.