const DIRECTION = 4;

const X = 0;
const Y = 1;

const REACHMODE = 1;
const LONGESTMODE = 2;

const DIRECTIONS = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];

export default class MazeAnswer {
  constructor(maze) {
    this.mazeSize = maze.length;
    this.mazeData = maze;
  }

  getAvailableRoads(maze, startPoint) {
    for (let direction = 0; direction < DIRECTION; direction++) {
      const nextPoint = [
        startPoint[X] + DIRECTIONS[direction][X],
        startPoint[Y] + DIRECTIONS[direction][Y],
      ];
      if (maze[nextPoint[X]][nextPoint[Y]]) {
        return nextPoint;
      }
    }
    return false;
  }

  hasRoads(maze) {
    for (let xIndex = 0; xIndex < this.mazeSize; xIndex++) {
      for (let yIndex = 0; yIndex < this.mazeSize; yIndex++) {
        if (maze[xIndex][yIndex]) {
          return true;
        }
      }
    }
    return false;
  }

  getBranchPoint(maze, verifyPoint) {
    if (verifyPoint === false) {
      return false;
    }
    let availableRoads = 0;
    for (let direction = 0; direction < DIRECTION; direction++) {
      const nextPoint = [
        verifyPoint[X] + DIRECTIONS[direction][X],
        verifyPoint[Y] + DIRECTIONS[direction][Y],
      ];
      if (maze[nextPoint[X]][nextPoint[Y]]) {
        availableRoads++;
      }
    }
    return availableRoads > 1 ? verifyPoint : false;
  }

  getMeetingTermsRoute(routes, startPoint) {
    let meetingTermsRoute = routes[0];
    for (
      let routesPattern = 1;
      routesPattern < routes.length;
      routesPattern++
    ) {
      for (
        let routeIndex = 0;
        routeIndex < routes[routesPattern].length;
        routeIndex++
      ) {
        if (routes[routesPattern][routeIndex] === startPoint) {
          meetingTermsRoute = routes[routesPattern];
        }
      }
    }
    return meetingTermsRoute;
  }

  getRouteToBranch(startPoint, routes) {
    if (routes.length === 0) {
      return [startPoint];
    }
    const meetingTermsRoute = this.getMeetingTermsRoute(routes, startPoint);
    for (
      let routeIndex = meetingTermsRoute.length - 1;
      routeIndex >= 0;
      routeIndex--
    ) {
      if (meetingTermsRoute[routeIndex] === startPoint) {
        return meetingTermsRoute.slice(0, routeIndex + 1);
      }
    }
    return [startPoint];
  }

  getStartPoint(maze, branchPoints) {
    for (
      let branchPointIndex = branchPoints.length - 1;
      branchPointIndex >= 0;
      branchPointIndex--
    ) {
      if (
        this.getAvailableRoads(maze, branchPoints[branchPointIndex]) !== false
      ) {
        return branchPoints[branchPointIndex];
      }
    }
  }

  getRoutes(maze, startPoint, routes, branchPoints) {
    const retensionRoute = this.getRouteToBranch(startPoint, routes);
    while (this.hasRoads(maze)) {
      const nextPoint = this.getAvailableRoads(maze, startPoint);
      const branchPoint = this.getBranchPoint(maze, startPoint);
      if (branchPoint !== false) {
        branchPoints.push(branchPoint);
      }
      maze[startPoint[X]][startPoint[Y]] = false;
      if (nextPoint === false) {
        if (retensionRoute.length !== 0) {
          routes.push(retensionRoute);
        }
        startPoint = this.getStartPoint(maze, branchPoints);
        return this.getRoutes(maze, startPoint, routes, branchPoints);
      }
      retensionRoute.push(nextPoint);
      startPoint = nextPoint;
    }
    return routes;
  }

  getAnswerRoute(mode) {
    const copyMaze = JSON.parse(JSON.stringify(this.mazeData));
    copyMaze[this.mazeSize - 1][1] = false;
    copyMaze[0][this.mazeSize - 2] = false;
    const REACHMODESTART = [this.mazeSize - 2, 1];
    const REACHOMODEGOAL = [0, this.mazeSize - 2];
    const routes = [];
    const branchPoints = [];
    const allRoutes = this.getRoutes(
      copyMaze,
      REACHMODESTART,
      routes,
      branchPoints
    );

    if (Number(mode) === REACHMODE) {
      for (let pattern = 0; pattern < allRoutes.length; pattern++) {
        for (
          let routeIndex = 0;
          routeIndex < allRoutes[pattern].length;
          routeIndex++
        ) {
          if (
            allRoutes[pattern][routeIndex][X] === REACHOMODEGOAL[X] + 1 &&
            allRoutes[pattern][routeIndex][Y] === REACHOMODEGOAL[Y]
          ) {
            const answerReachRoute = allRoutes[pattern].slice(
              0,
              routeIndex + 1
            );
            answerReachRoute.push(REACHOMODEGOAL);
            return answerReachRoute;
          }
        }
      }
    }

    if (Number(mode) === LONGESTMODE) {
      let answerLongestRoute = allRoutes[0];
      for (let pattern = 1; pattern < allRoutes.length; pattern++) {
        if (answerLongestRoute.length < allRoutes[pattern].length) {
          answerLongestRoute = allRoutes[pattern];
        }
      }
      return answerLongestRoute;
    }
  }
}
