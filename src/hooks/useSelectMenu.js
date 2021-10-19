import { mazeSlice, store } from "../modules/Modules";
import { useSelector, useDispatch } from "react-redux";

const useSelectMenu = () => {
  const { size, mode, isModalOpen, timer } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleSizeChange = (size) => {
    const sizeChange = mazeSlice.actions.sizeChange(Number(size));
    dispatch(sizeChange);
  };

  const handleModeChange = (mode) => {
    const modeChange = mazeSlice.actions.modeChange(Number(mode));
    dispatch(modeChange);
  };

  const handleSetMaze = () => {
    const setMaze = mazeSlice.actions.setMaze();
    const update = mazeSlice.actions.updateTimer();
    const intervalID = setInterval(() => dispatch(update), 10);
    const start = mazeSlice.actions.startTimer(intervalID);
    dispatch(setMaze);
    dispatch(start);
  };

  const openModalWindow = () => {
    const openWindow = mazeSlice.actions.openWindow(true);
    dispatch(openWindow);
  };

  const closeModalWindow = () => {
    const { timer } = store.getState();
    const close = timer === "stop" ? true : false;
    const closeWindow = mazeSlice.actions.closeWindow(close);
    dispatch(closeWindow);

    if (timer === "start" || timer === "pause") {
      const update = mazeSlice.actions.updateTimer();
      const intervalID = setInterval(() => dispatch(update), 10);
      const resume = mazeSlice.actions.startTimer(intervalID);
      dispatch(resume);
    }
  };

  const handleShowAnswer = () => {
    const showAnswer = mazeSlice.actions.showAnswer(true);
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
