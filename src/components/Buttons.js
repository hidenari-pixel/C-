import React from "react";
import { Button } from "@material-ui/core";
import useSelectMenu from "../hooks/useSelectMenu";
import styled from "styled-components";

const Buttons = () => {
  const { timer, handleSetMaze, handleShowAnswer, closeModalWindow } =
    useSelectMenu();
  if (timer !== "stop") {
    return (
      <Wrapper>
        <Button
          color="primary"
          variant="contained"
          onClick={() => handleSetMaze()}
          style={{ margin: 5 }}
        >
          再生成＆スタート
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={() => handleShowAnswer()}
          style={{ margin: 5 }}
        >
          解答
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={() => closeModalWindow()}
          style={{ margin: 5 }}
        >
          閉じる
        </Button>
      </Wrapper>
    );
  }

  return (
    <Button color="primary" variant="contained" onClick={() => handleSetMaze()}>
      生成{"&"}スタート
    </Button>
  );
};

export default Buttons;

const Wrapper = styled.div`
  width: 100%;
`;
