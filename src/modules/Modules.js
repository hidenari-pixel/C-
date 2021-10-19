import Maze from "./Maze";
import MazeAnswer from "./MazeAnswer";
import { createSlice, configureStore } from "@reduxjs/toolkit";

const LONGESTMODE = 2;

export const DEFAULTSIZE = 10;
export const DEFAULTMODE = 1;

export const getKeyArray = (key) => {
  switch (key) {
    case "ArrowUp":
      return [-1, 0];
    case "ArrowRight":
      return [0, 1];
    case "ArrowDown":
      return [1, 0];
    case "ArrowLeft":
      return [0, -1];
    default:
      return [0, 0];
  }
};

export const X = 0;
export const Y = 1;

const maze = new Maze(DEFAULTSIZE);
const mazeData = maze.digGoal(DEFAULTMODE);
const mazeAnswer = new MazeAnswer(mazeData);
const mazeAnswerData = mazeAnswer.getAnswerRoute(DEFAULTMODE);

const isAvailable = (state, payload) => {
  if (state.xIndex === state.size - 1 && payload.key !== "ArrowUp") {
    return [state.xIndex, state.yIndex];
  }
  const nextPoint = [
    state.xIndex + payload.nextX,
    state.yIndex + payload.nextY,
  ];
  if (!state.data[nextPoint[X]][nextPoint[Y]]) {
    return [state.xIndex, state.yIndex];
  }
  return nextPoint;
};

const setGoal = (size, mode, answerData) => {
  if (mode === LONGESTMODE) {
    const longestModeGoal = [
      answerData.slice(-1)[0][X],
      answerData.slice(-1)[0][Y],
    ];
    return longestModeGoal;
  }
  return [0, size - 2];
};

const switchMovable = (state) => {
  if (
    (state.xIndex === state.goal[X] && state.yIndex === state.goal[Y]) ||
    state.isModalOpen === true
  ) {
    return false;
  }
  return true;
};

const setTimerState = (state) => {
  if (
    (state.goal[X] === state.xIndex && state.goal[Y] === state.yIndex) ||
    state.answerShow === true
  ) {
    return "finish";
  }

  return state.xIndex === state.start[X] && state.yIndex === state.start[Y]
    ? "stop"
    : "start";
};

const toText = (time) => {
  return ("000" + time).slice(-3);
};

const initialState = {
  size: DEFAULTSIZE,
  mode: DEFAULTMODE,
  data: mazeData,
  answerData: mazeAnswerData,
  answerShow: false,
  isModalOpen: true,
  start: [DEFAULTSIZE - 1, 1],
  goal: [0, DEFAULTSIZE - 2],
  movable: false,
  xIndex: DEFAULTSIZE - 1,
  yIndex: 1,
  minutes: "000",
  seconds: "000",
  milliSeconds: "000",
  time: 0,
  timer: "stop",
  intervalID: -1,
  squareLength: 500,
};

export const mazeSlice = createSlice({
  name: "mazeState",
  initialState,
  reducers: {
    sizeChange: (state, action) => {
      return {
        ...state,
        size: action.payload,
      };
    },
    modeChange: (state, action) => {
      return {
        ...state,
        mode: action.payload,
      };
    },
    setMaze: (state) => {
      const newMaze = new Maze(state.size);
      const newMazeData = newMaze.digGoal(state.mode);
      const newAnswer = new MazeAnswer(newMazeData);
      const newAnswerData = newAnswer.getAnswerRoute(state.mode);
      clearInterval(state.intervalID);
      return {
        ...state,
        data: newMazeData,
        answerData: newAnswerData,
        isModalOpen: false,
        answerShow: false,
        xIndex: state.size - 1,
        yIndex: 1,
        start: [state.size - 1, 1],
        goal: setGoal(state.size, state.mode, newAnswerData),
        minutes: "000",
        seconds: "000",
        milliSeconds: "000",
        time: 0,
        timer: "stop",
        intervalID: -1,
      };
    },
    openWindow: (state, action) => {
      clearInterval(state.intervalID);
      return {
        ...state,
        isModalOpen: action.payload,
        timer: setTimerState(state),
      };
    },
    closeWindow: (state, action) => {
      return {
        ...state,
        isModalOpen: action.payload,
        timer: setTimerState(state),
      };
    },
    movePoint: (state, action) => {
      const movable = switchMovable(state);
      if (!movable) {
        clearInterval(state.intervalID);
        return {
          ...state,
        };
      }
      const nextPoint = isAvailable(state, action.payload);
      if (nextPoint[X] === state.goal[X] && nextPoint[Y] === state.goal[Y]) {
        clearInterval(state.intervalID);
        return {
          ...state,
          xIndex: nextPoint[X],
          yIndex: nextPoint[Y],
          movable: movable,
          intervalID: -1,
          timer: "finish",
        };
      }
      return {
        ...state,
        xIndex: nextPoint[X],
        yIndex: nextPoint[Y],
        movable: movable,
      };
    },
    showAnswer: (state, action) => {
      return {
        ...state,
        answerShow: action.payload,
        isModalOpen: false,
      };
    },
    startTimer: (state, action) => {
      return {
        ...state,
        intervalID: action.payload,
        timer: "start",
      };
    },
    updateTimer: (state) => {
      const time = state.time + 1;
      const minutes = parseInt((time / 100 / 60) % 100, 10);
      const seconds = parseInt((time / 100) % 60, 10);
      const milliSeconds = parseInt(time % 100, 10);
      return {
        ...state,
        minutes: toText(minutes),
        seconds: toText(seconds),
        milliSeconds: toText(milliSeconds),
        time: time,
      };
    },
  },
});

export const store = configureStore({
  reducer: mazeSlice.reducer,
});
