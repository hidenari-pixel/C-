import { useSelector } from "react-redux";

const useTimer = () => {
  const { minutes, seconds, milliSeconds } = useSelector((state) => state);

  return {
    minutes,
    seconds,
    milliSeconds,
  };
};

export default useTimer;
