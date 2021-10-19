import { useDispatch } from "react-redux";
import { currentState, getKeyArray, X, Y } from "../modules/Reducers";

const useSPButton = () => {
  const dispatch = useDispatch();

  const buttonAction = (key) => {
    const nextPoint = getKeyArray(key);
    const payload = {
      nextX: nextPoint[X],
      nextY: nextPoint[Y],
      key: key,
    };
    const movePoint = currentState.actions.movePoint(payload);
    dispatch(movePoint);
  };
  return {
    buttonAction,
  };
};

export default useSPButton;
