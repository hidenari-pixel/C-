import React from "react";
import styled from "styled-components";
import useTimer from "../hooks/useTimer";
import TimerDisplay from "./TimerDisplay";

const Timer = () => {
  const { minutes, seconds, milliSeconds } = useTimer();

  return (
    <TimerWrapper>
      <TimerDisplay
        minutes={minutes}
        seconds={seconds}
        milliSeconds={milliSeconds}
      />
    </TimerWrapper>
  );
};

const TimerWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export default Timer;
