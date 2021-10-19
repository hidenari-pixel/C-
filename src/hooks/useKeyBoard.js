import { mazeSlice, getKeyArray, X, Y } from "../modules/Modules";
import { useSelector, useDispatch } from "react-redux";

const getPayload = (key) => {
  const nextPoint = getKeyArray(key);
  return {
    nextX: nextPoint[X],
    nextY: nextPoint[Y],
    key: key,
  };
};

const useKeyBoard = () => {
  const { size, data, answerData, answerShow, xIndex, yIndex, goal } =
    useSelector((state) => state);

  const dispatch = useDispatch();

  const movePoint = (rowIndex, colIndex) => {
    if (rowIndex === xIndex && colIndex === yIndex) {
      return true;
    }
    return false;
  };

  const goalPoint = (rowIndex, colIndex) => {
    if (rowIndex === goal[X] && colIndex === goal[Y]) {
      return true;
    }
    return false;
  };

  const showAnswer = (rowIndex, colIndex) => {
    if (answerShow === false) {
      return goalPoint(rowIndex, colIndex) ? true : false;
    }
    for (let answerIndex = 0; answerIndex < answerData.length; answerIndex++) {
      if (
        answerData[answerIndex][X] === rowIndex &&
        answerData[answerIndex][Y] === colIndex
      ) {
        return true;
      }
    }
    return false;
  };

  const keyDownAction = (key) => {
    const payload = getPayload(key);
    const movePoint = mazeSlice.actions.movePoint(payload);
    dispatch(movePoint);
  };
  return {
    data,
    size,
    keyDownAction,
    movePoint,
    showAnswer,
  };
};

export default useKeyBoard;
