/* Maze Generation implemented using recursive backtracking, found at:
   https://weblog.jamisbuck.org/2010/12/27/maze-generation-recursive-backtracking */

const enum Direction {
  N = 1, // i.e. 0b0001
  S = 2, // i.e. 0b0010
  E = 4, // i.e. 0b0100
  W = 8, // i.e. 0b1000
}

const diffY: Record<Direction, number> = {
  [Direction.N]: 1,
  [Direction.S]: -1,
  [Direction.E]: 0,
  [Direction.W]: 0
};

const diffX: Record<Direction, number> = {
  [Direction.N]: 0,
  [Direction.S]: 0,
  [Direction.E]: 1,
  [Direction.W]: -1
};

const opposite: Record<Direction, Direction> = {
  [Direction.N]: Direction.S,
  [Direction.S]: Direction.N,
  [Direction.E]: Direction.W,
  [Direction.W]: Direction.E
}

function carveWalls(currX: number, currY: number, maze: number[][]) {
  const directions = [Direction.N, Direction.S, Direction.E, Direction.W];
  for (const direction of directions) {
    const nextX = currX + diffX[direction];
    const nextY = currY + diffY[direction];

    /* Check that the new coordinates are legal, and haven't
       been visited before. */
    if (nextX >= 0 && nextX < maze[0].length &&
      nextY >= 0 && nextY < maze.length && maze[nextY][nextX] === 0) {
      console.log(`Valid: moving to (${nextX}, ${nextY})`);
      maze[currY][currX] |= direction;
      maze[nextY][nextX] |= opposite[direction];

      carveWalls(nextX, nextY, maze);
    }
  }
}

export function generateMaze(width: number, height: number): number[][] {
  /* Initialise maze array with 0s (i.e. unvisited cells) */
  const maze: number[][] = [];
  if (width === 0 || height === 0) return maze;

  for (let i = 0; i < height; i++) {
    maze[i] = new Array(width).fill(0);
  }

  /* Generate Maze */
  carveWalls(0, 0, maze);

  return maze;
}
