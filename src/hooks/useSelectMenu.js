import { currentState, store } from "../modules/Reducers";
import { useSelector, useDispatch } from "react-redux";

const useSelectMenu = () => {
  const { size, mode, isModalOpen, timer } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleSizeChange = (size) => {
    const sizeChange = currentState.actions.sizeChange(Number(size));
    dispatch(sizeChange);
  };

  const handleModeChange = (mode) => {
    const modeChange = currentState.actions.modeChange(Number(mode));
    dispatch(modeChange);
  };

  const handleSetMaze = () => {
    const setMaze = currentState.actions.setMaze();
    const update = currentState.actions.updateTimer();
    const intervalID = setInterval(() => dispatch(update), 10);
    const start = currentState.actions.startTimer(intervalID);
    dispatch(setMaze);
    dispatch(start);
  };

  const openModalWindow = () => {
    const openWindow = currentState.actions.openWindow(true);
    dispatch(openWindow);
  };

  const closeModalWindow = () => {
    const { timer } = store.getState();
    const close = timer === "stop" ? true : false;
    const closeWindow = currentState.actions.closeWindow(close);
    dispatch(closeWindow);

    if (timer === "start" || timer === "pause") {
      const update = currentState.actions.updateTimer();
      const intervalID = setInterval(() => dispatch(update), 10);
      const resume = currentState.actions.startTimer(intervalID);
      dispatch(resume);
    }
  };

  const handleShowAnswer = () => {
    const showAnswer = currentState.actions.showAnswer(true);
    dispatch(showAnswer);
  };

  return {
    size,
    mode,
    isModalOpen,
    timer,
    handleSetMaze,
    handleShowAnswer,
    closeModalWindow,
    handleModeChange,
    handleSizeChange,
    openModalWindow,
  };
};

export default useSelectMenu;
