import MediaQuery from "react-responsive";
import useSPButton from "../hooks/useSPButton";
import styled from "styled-components";

const SPDisplay = () => {
  const { buttonAction } = useSPButton();
  return (
    <SPDisplayWrapper>
      <MediaQuery query="(max-width: 1024px)">
        <UpButton onPointerDown={() => buttonAction("ArrowUp")}></UpButton>
        <RightButton
          onPointerDown={() => buttonAction("ArrowRight")}
        ></RightButton>
        <DownButton
          onPointerDown={() => buttonAction("ArrowDown")}
        ></DownButton>
        <LeftButton
          onPointerDown={() => buttonAction("ArrowLeft")}
        ></LeftButton>
      </MediaQuery>
    </SPDisplayWrapper>
  );
};

const SPDisplayWrapper = styled.div`
  position: absolute;
  top: 70%;
  left: 45%;
  width: 150px;
  height: 150px;
  display: flex;
  justify-content: center;
  align-item: center;
`;

const Button = styled.div`
  border-right: 25px solid transparent;
  border-bottom: 50px solid #00ecff;
  border-left: 25px solid transparent;
`;

const UpButton = styled(Button)`
  position: absolute;
  top: 0;
  left: 0;
`;

const RightButton = styled(Button)`
  position: absolute;
  top: 50px;
  left: 50px;
  transform: rotate(90deg);
`;

const DownButton = styled(Button)`
  position: absolute;
  top: 100px;
  left: 0px;
  transform: rotate(180deg);
`;

const LeftButton = styled(Button)`
  position: absolute;
  top: 50px;
  left: -50px;
  transform: rotate(270deg);
`;

export default SPDisplay;
