import styled from "styled-components";

const TimerDisplay = (props) => {
  const { minutes, seconds, milliSeconds } = props;
  return (
    <Wrapper>
      <TimeStyle>{minutes} : </TimeStyle>
      <TimeStyle>{seconds} : </TimeStyle>
      <TimeStyle>{milliSeconds}</TimeStyle>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  flex-wrap: unwrap;
`;

const TimeStyle = styled.h5`
  display: inline-block;
  font-size: 20px;
  color: #000055;
  padding-top: 1rem;
  margin: 5px;
`;

export default TimerDisplay;
