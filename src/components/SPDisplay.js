import React from "react";
import MediaQuery from "react-responsive";
import useSPButton from "../hooks/useSPButton";
import styled from "styled-components";

const SPDisplay = () => {
  const { buttonAction } = useSPButton();
  return (
    <SPDisplayWrapper>
      <MediaQuery query="(max-width: 1024px)">
        <ButtonWrapper>
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
        </ButtonWrapper>
      </MediaQuery>
    </SPDisplayWrapper>
  );
};

const SPDisplayWrapper = styled.div`
  height: 100%;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  position: relative;
  width: 12%;
  height: 30%;
  display: flex;
  justify-content: center;
  align-self: center;
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
