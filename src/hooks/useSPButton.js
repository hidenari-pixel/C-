import { useDispatch } from "react-redux";
import { mazeSlice, getKeyArray, X, Y } from "../modules/Modules";

const useSPButton = () => {
  const dispatch = useDispatch();

  const buttonAction = (key) => {
    const nextPoint = getKeyArray(key);
    const payload = {
      nextX: nextPoint[X],
      nextY: nextPoint[Y],
      key: key,
    };
    const movePoint = mazeSlice.actions.movePoint(payload);
    dispatch(movePoint);
  };
  return {
    buttonAction,
  };
};

export default useSPButton;
