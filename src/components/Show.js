import React, { useEffect, useRef, useState } from "react";
import useKeyBoard from "../hooks/useKeyBoard";
import styled from "styled-components";
import Timer from "./Timer";

const Show = () => {
  const { data, size, keyDownAction, movePoint, showAnswer } = useKeyBoard();
  const element = useRef(null);
  const [length, setLength] = useState(0);

  useEffect(() => {
    const squareLength = element.current.clientWidth;
    setLength(squareLength);
    document.addEventListener("keydown", (event) => {
      keyDownAction(event.key);
    });
    return () => {
      document.removeEventListener("keydown", (event) => {
        keyDownAction(event.key);
      });
    };
  }, []);

  const sideLength = length / size;
  const rowStyle = {
    padding: 0,
    height: sideLength,
  };
  const roadStyle = {
    padding: 0,
    width: sideLength,
    height: sideLength,
    lineheight: sideLength,
    border: "none",
    display: "inline-block",
    boxsizing: "border-box",
  };

  return (
    <MazeWrapper ref={element} height={length}>
      {data.map((row, rowIndex) => {
        return (
          <div style={rowStyle} key={`row:${rowIndex}`}>
            {row.map((point, colIndex) => {
              const road = point;
              return (
                <button
                  key={`row:${rowIndex},col:${colIndex}`}
                  className={movePoint(rowIndex, colIndex) ? "move" : ""}
                  style={{
                    ...roadStyle,
                    backgroundColor: road
                      ? showAnswer(rowIndex, colIndex)
                        ? "skyblue"
                        : ""
                      : "black",
                  }}
                />
              );
            })}
          </div>
        );
      })}
    </MazeWrapper>
  );
};

const MazeWrapper = styled.div`
  position: absolute;
  top: 160px;
  left: 50%;
  transform: translateX(-50%);
  min-width: 40%;
  height: ${(props) => props.height}px;
`;

export default Show;
