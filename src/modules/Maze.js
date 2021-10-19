const DIRECTION = 4;

const X = 0;
const Y = 1;

const REACHMODE = 1;

const DIRECTIONS = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];

export default class Maze {
  constructor(size) {
    this.xSize = size;
    this.ySize = size;
  }

  createMaze() {
    const maze = new Array(this.xSize);
    for (let xIndex = 0; xIndex < this.xSize; xIndex++) {
      maze[xIndex] = new Array(this.ySize);
      for (let yIndex = 0; yIndex < this.ySize; yIndex++) {
        maze[xIndex][yIndex] = false;
      }
    }
    maze[this.xSize - 2][1] = true;
    return maze;
  }

  judgeEdge(xIndex, yIndex) {
    const edgeArray = [0, this.ySize - 1, this.xSize - 1, 0];
    for (let direction = 0; direction < DIRECTION; direction++) {
      if (
        (direction % 2 === 0 && xIndex === edgeArray[direction]) ||
        (direction % 2 === 1 && yIndex === edgeArray[direction])
      ) {
        return false;
      }
    }
    return true;
  }

  judgeDirections(xIndex, yIndex, direction, maze) {
    const nextXIndex = xIndex + DIRECTIONS[direction][X];
    const nextYIndex = yIndex + DIRECTIONS[direction][Y];
    if (
      maze[nextXIndex][nextYIndex] === false &&
      this.judgeEdge(nextXIndex, nextYIndex)
    ) {
      return true;
    }
    return false;
  }
  /**
   * ある地点の座標について, その地点からまだ進める方向を格納した配列を返す
   * @param  xIndex その時点でのx座標
   * @param  yIndex その時点でのy座標
   * @param  maze 迷路の配列
   * @returns 配列(進める方向)
   */
  getMovableDirections(xIndex, yIndex, maze) {
    const digableDirections = [];
    for (let direction = 0; direction < DIRECTION; direction++) {
      let judgeCount = 0;
      for (
        let observingDirectionIndex = 0;
        observingDirectionIndex < DIRECTION;
        observingDirectionIndex++
      ) {
        let excludeDirection = (observingDirectionIndex + 2) % 4;
        if (this.judgeDirections(xIndex, yIndex, direction, maze)) {
          let nextXIndex =
            xIndex + DIRECTIONS[direction][X] + DIRECTIONS[excludeDirection][X];
          let nextYIndex =
            yIndex + DIRECTIONS[direction][Y] + DIRECTIONS[excludeDirection][Y];
          if (!maze[nextXIndex][nextYIndex]) {
            judgeCount++;
          }
        }
      }
      if (judgeCount === 3) {
        digableDirections.push(direction);
      }
    }
    return digableDirections;
  }

  isDigable(xIndex, yIndex, maze) {
    if (
      maze[xIndex][yIndex] &&
      this.getMovableDirections(xIndex, yIndex, maze).length !== 0
    ) {
      return true;
    }
    return false;
  }

  hasDigableRoads(maze) {
    for (let xIndex = 1; xIndex < this.xSize - 1; xIndex++) {
      for (let yIndex = 1; yIndex < this.ySize - 1; yIndex++) {
        if (this.isDigable(xIndex, yIndex, maze)) {
          return true;
        }
      }
    }
    return false;
  }

  digRoad(xIndex, yIndex, digableDirection, maze) {
    const nextPoint = [];
    nextPoint[X] = xIndex + DIRECTIONS[digableDirection][X];
    nextPoint[Y] = yIndex + DIRECTIONS[digableDirection][Y];
    maze[nextPoint[X]][nextPoint[Y]] = true;
    return nextPoint;
  }

  digMaze(maze) {
    let xIndex = this.xSize - 2;
    let yIndex = 1;
    while (this.hasDigableRoads(maze)) {
      const directions = this.getMovableDirections(xIndex, yIndex, maze);
      if (directions.length > 0) {
        const digableDirection = Math.floor(Math.random() * directions.length);
        const nextPoint = this.digRoad(
          xIndex,
          yIndex,
          directions[digableDirection],
          maze
        );
        if (nextPoint.length > 0) {
          xIndex = nextPoint[X];
          yIndex = nextPoint[Y];
        }
      } else if (directions.length === 0) {
        const nextRestartPoint = this.getRestartPoint(maze);
        if (nextRestartPoint !== 0) {
          xIndex = nextRestartPoint[X];
          yIndex = nextRestartPoint[Y];
        }
      }
    }
    return maze;
  }

  getRestartPoint(maze) {
    const nextRestartPoint = [];
    for (let xIndex = 1; xIndex < this.xSize - 1; xIndex++) {
      for (let yIndex = 1; yIndex < this.ySize - 1; yIndex++) {
        if (maze[xIndex][yIndex]) {
          if (this.getMovableDirections(xIndex, yIndex, maze).length > 0) {
            let candidateRestartPoint = [xIndex, yIndex];
            nextRestartPoint.push(candidateRestartPoint);
            break;
          }
        }
      }
    }
    if (nextRestartPoint.length > 0) {
      const restartPointIndex = Math.floor(
        Math.random() * nextRestartPoint.length
      );
      return nextRestartPoint[restartPointIndex];
    }
    return 0;
  }

  digGoal(mode) {
    const GOAL = [1, this.ySize - 2];
    let maze = this.createMaze();
    let result = this.digMaze(maze);
    while (!maze[GOAL[X]][GOAL[Y]]) {
      maze = this.createMaze();
      result = this.digMaze(maze);
    }
    result[this.xSize - 1][1] = true;
    if (Number(mode) === REACHMODE) {
      result[0][this.ySize - 2] = true;
    }
    return result;
  }
}
